const Projets = require("../models/Projet");
const cloudinary = require('cloudinary').v2;




/*** Cette route permet de récupérer une array de l'ensemble des projets avec leurs informations */

exports.getList = (req, res, next) => {
  Projets.find({})
    .then((Projets) => res.status(200).json(Projets))
    .catch((error) => res.status(400).json({ error }));
};

/*** Cette route permet de récupérer les informations du projet choisi sur la page d'accueil */

exports.getProjet = (req, res, next) => {
  Projets.findOne({ _id: req.params.id })
    .then((Projet) => res.status(200).json(Projet))
    .catch((error) => res.status(400).json({ error }));
};

/*** Cette route permet de publier un nouveau projet */

exports.postProjet = (req, res, next) => {
  try {
    
    const ProjetObject = JSON.parse(req.body.Projet);
    delete ProjetObject._id;

    if (!req.coverUrl || !req.picturesUrls || req.picturesUrls.length === 0) {
      return res.status(400).json({ error: "Les images sont obligatoires." });
    }
 
    const coverUrl = req.coverUrl; 
    const picturesUrls = req.picturesUrls; 

  
    const Projet = new Projets({
      ...ProjetObject,
      cover: coverUrl,
      pictures: picturesUrls,
    });


    Projet.save()
      .then(() => res.status(201).json({ message: 'Projet ajouté' }))
      .catch((error) => res.status(400).json({ error: 'Erreur lors de la sauvegarde' }));
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du traitement des données' });
  }
};

/*** Cette route permet de modifier un projet existant, en supprimant si besoin les fichiers existant */

exports.putProjet = async (req, res, next) => {
  try {
    
    const ProjetObject = JSON.parse(req.body.Projet);
    delete ProjetObject._id;

    console.log("Objet du projet après parsing :", ProjetObject);

    const Projet = await Projets.findOne({ _id: req.params.id });
    if (!Projet) {
      console.error("Projet non trouvé avec l'ID :", req.params.id);
      return res.status(404).json({ error: "Projet non trouvé" });
    }

    let existingCoverUrl = Projet.cover;
    let newCoverUrl = existingCoverUrl;

    console.log("URL de la cover existante :", existingCoverUrl);

    
    if (req.files && req.files.cover) {
      newCoverUrl = req.coverUrl;
      console.log("Nouvelle cover reçue :", newCoverUrl);

      // Supprimer l'ancienne cover si elle existe
      if (existingCoverUrl) {
        const oldCoverPublicId = existingCoverUrl.split("/upload/")[1].split("/")[1].split(".")[0];
        const formattedCoverPublicId = oldCoverPublicId + ".webp";

        console.log("ID public de l'ancienne cover :", formattedCoverPublicId);

        // Supprimer l'ancienne cover de Cloudinary
        const result = await cloudinary.uploader.destroy(formattedCoverPublicId);
        console.log("Résultat de la suppression de l'ancienne cover :", result);
      }
    } else {
      console.log("Aucune nouvelle cover reçue.");
    }


    const projetPictures = Projet.pictures || [];

    console.log("Images du projet", projetPictures);
    console.log("Images non supprimées déjà existantes", ProjetObject.existingPictures);

    const existingPictures = ProjetObject.existingPictures || [];
    const newPictures = req.picturesUrls || [];
    const allPictures = [...existingPictures, ...newPictures];

    // Vérification qu'au moins une image est envoyée 

    if (allPictures.length === 0) {
      console.error("Aucune image restante ou ajoutée après la mise à jour.");
      return res.status(400).json({
        error: "Vous devez conserver au moins une image ou en ajouter une nouvelle.",
      });
    }


    // Identifier les images à supprimer
    const picturesToDelete = projetPictures.filter(picture => 
      !newPictures.includes(picture) && !existingPictures.includes(picture)
    );

    console.log("Images à supprimer", picturesToDelete);

    
    for (const picture of picturesToDelete) {
      const publicId = picture.split("/upload/")[1].split("/")[1].split(".")[0];
      const result = await cloudinary.uploader.destroy(publicId);
      console.log(`Résultat de la suppression de l'image ${picture} :`, result);

      await Projets.updateOne(
        { _id: req.params.id },
        { $pull: { pictures: picture } }
      );
    }




    const updatedProjet = await Projets.findOneAndUpdate(
      { _id: req.params.id },
      { ...ProjetObject, cover: newCoverUrl, pictures: allPictures },
      { new: true }
    );

    if (updatedProjet) {
      console.log("Projet mis à jour avec succès.");
      res.status(200).json({ message: "Projet mis à jour avec succès" });
    } else {
      console.error("Aucune modification apportée au projet.");
      res.status(400).json({ error: "Aucune modification apportée au projet" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du projet :", error);
    res.status(400).json({ error: error.message });
  }
};

/*** Cette route permet de supprimer un projet existant */

exports.deleteProjet = (req, res, next) => {
  Projets.findOne({ _id: req.params.id })
    .then((Projet) => {
      
      const coverPublicId = Projet.cover.split("/upload/")[1].split("/")[1].split(".")[0]; 
      const formattedCoverPublicId = coverPublicId + ".webp";
      cloudinary.uploader
        .destroy(formattedCoverPublicId)
        .then(() => {
          
          const picturePublicIds = Projet.pictures.map((pictureUrl) => {
            
            const publicId = pictureUrl.split("/upload/")[1].split("/")[1].split(".")[0];
            const formattedPublicId = publicId + ".webp";
            console.log("Public ID pour picture :", formattedPublicId);
            return formattedPublicId;
          });
          
          const deletePromises = picturePublicIds.map((publicId) => {
          
            return cloudinary.uploader.destroy(publicId);
          });

         
          Promise.all(deletePromises)
            .then(() => {
              
              Projets.deleteOne({ _id: req.params.id })
                .then(() => {
                  res.status(200).json({ message: "Projet et images supprimés" });
                })
                .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};


exports.putSimpleProjet = (req, res, next) => {
  const ProjetObject = JSON.parse(req.body.Projet);

  if (!ProjetObject.title || !ProjetObject.snippet) {
    return res.status(400).json({ message: "Titre et snippet sont requis." });
  }

  Projets.updateOne(
    { _id: req.params.id },
    { title: ProjetObject.title, snippet: ProjetObject.snippet }
  )
    .then(() =>
      res.status(200).json({ message: "Projet mis à jour avec succès." })
    )
    .catch((error) => res.status(400).json({ error }));
};