const router = require("express").Router();
const { Pet, PetType, User } = require("../../models/");
//const withAuth = require('../../utils/auth');

// ===== Pet Types =====
// Create
router.post("/types/", async (req, res) => {
    try {
        const newPetType = await PetType.create(req.body);
        res.status(200).json(newPetType);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Read all
router.get("/types/", async (req, res) => {
    try {
        const petTypes = await PetType.findAll();
        res.status(200).json(petTypes);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Read by id
router.get("/types/:id", async (req, res) => {
    try {
        const petType = await PetType.findByPk(req.params.id);

        if (petType != null) {
            res.status(200).json(petType);
        } else {
            res.status(404).json({
                message: `No petType found with id: ${req.params.id}`,
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update
//router.put('/:id', withAuth, async (req, res) => {
router.put("/types/:id", async (req, res) => {
    try {
        const [affectedRowCount] = await PetType.update(req.body, {
            where: { id: req.params.id },
        });

        if (affectedRowCount > 0) {
            res.status(200).json(affectedRowCount);
        } else {
            res.status(404).json(affectedRowCount);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete
router.delete("/types/:id", async (req, res) => {
    try {
        const isDeleted = await PetType.destroy({
            where: { id: req.params.id },
        });

        if (isDeleted != 0) {
            res.status(200).json(isDeleted);
        } else {
            res.status(404).json(isDeleted);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// ===== Pets =====
// Create
router.post("/", async (req, res) => {
    try {
        //// TEMPORARY ////
        if (req.session.user_id == null) {
            req.session.user_id = 1;
        }

        const requestedPet = { ...req.body, owner_id: req.session.user_id };
        // console.log('\nNew Pet Request:');
        // console.log(requestedPet);
        // console.log();

        const newPet = await Pet.create(requestedPet, {
            include: [{ model: PetType }],
            order: [["id", "asc"]],
        });
        res.status(200).json(newPet);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Read all
router.get("/", async (req, res) => {
<<<<<<< HEAD
  try {
    const pets = await Pet.findAll({
      include: [
        { model: PetType, attributes: ["name"] },
        { model: User, attributes: ["name"] }
      ],
      attributes: {
        exclude: ["owner_id", "pet_type_id", "createdAt", "updatedAt"],
      },
      order: [
        ["id", "asc"], // this orders first by Pet.id
        //[{ model: Visit }, 'id', 'asc']   // this orders second by Visit.id
      ],
    });
    res.status(200).json(pets);

  } catch (err) {
    res.status(500).json(err);
  }
=======
    try {
        const pets = await Pet.findAll({
            include: [
                { model: PetType, attributes: ["name"] },
                { model: User, attributes: ["name"] },
            ],
            attributes: {
                exclude: ["owner_id", "pet_type_id", "createdAt", "updatedAt"],
            },
            order: [
                ["id", "asc"], // this orders first by Pet.id
                //[{ model: Visit }, 'id', 'asc']   // this orders second by Visit.id
            ],
        });
        res.status(200).json(pets);
    } catch (err) {
        res.status(500).json(err);
    }
>>>>>>> 1961e2c13e370ea4b4d3539b6763df5e47e8c63f
});

// Read by id
router.get("/:id", async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.id);

        if (pet != null) {
            res.status(200).json(pet);
        } else {
            res.status(404).json({
                message: `No pet found with id: ${req.params.id}`
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Read by user_id
router.get("/byuserid/:id", async (req, res) => {
    try {
        console.log("\nBEFORE");

        const pets = await Pet.findAll({
            where: { owner_id: req.params.id },
            include: [
                { model: PetType, attributes: ["name"] }
            ],
            attributes: {
                exclude: ["owner_id", "pet_type_id", "createdAt", "updatedAt"],
            },
            order: [["id", "asc"]]
        });

        console.log("\nAFTER\n");

        if (pets != null) {
            res.status(200).json(pets);
        } else {
            res.status(404).json({ message: `No pets found` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Update
//router.put('/:id', withAuth, async (req, res) => {
router.put("/:id", async (req, res) => {
    try {
        const [affectedRowCount] = await Pet.update(req.body, {
            where: { id: req.params.id },
        });

        if (affectedRowCount > 0) {
            res.status(200).json(affectedRowCount);
        } else {
            res.status(404).json(affectedRowCount);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete
router.delete("/:id", async (req, res) => {
    try {
        const isDeleted = await Pet.destroy({ where: { id: req.params.id } });

        if (isDeleted != 0) {
            res.status(200).json(isDeleted);
        } else {
            res.status(404).json(isDeleted);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
