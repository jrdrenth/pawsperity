const router = require("express").Router();
const {
    Visit,
    User,
    Pet,
    ServiceProvider,
    ServiceProvided,
    Service,
    ServiceCategory,
    PetType,
} = require("../../models");
// const { Visit } = require('../../models');
//const withAuth = require('../../utils/auth');

// ===== Visit =====
// Create
router.post("/", async (req, res) => {
    try {
        const newVisit = await Visit.create(req.body);
        res.status(200).json(newVisit);
    } catch (err) {
        console.log({ err });
        res.status(500).json(err);
    }
});

// Read all
router.get("/", async (req, res) => {
    try {
        const visits = await Visit.findAll({
            attributes: { exclude: ["pet_id", "service_provider_id"] },
            include: [
                {
                    model: Pet,
                    attributes: ["id", "name"],
                    include: [
                        {
                            model: User,
                            attributes: ["id", "name"],
                        },
                    ],
                },
                {
                    model: ServiceProvider,
                    attributes: ["id", "name"],
                },
                {
                    model: ServiceProvided,
                    attributes: { exclude: ["visit_id", "service_id"] },
                    include: [
                        {
                            model: Service,
                            attributes: ["name"],
                            include: [
                                {
                                    model: ServiceCategory,
                                    attributes: ["name"],
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [
                ["id", "asc"], // order first by Visit.id
                [{ model: ServiceProvided }, "id", "asc"], // order second by ServiceProvided.id
            ],
        });
        res.status(200).json(visits);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Read by id
router.get("/:id", async (req, res) => {
    try {
        const visit = await Visit.findByPk(req.params.id, {
            attributes: { exclude: ["pet_id", "service_provider_id"] },
            include: [
                {
                    model: Pet,
                    attributes: ["id", "name"],
                    include: [
                        {
                            model: User,
                            attributes: ["id", "name"],
                        },
                    ],
                },
                {
                    model: ServiceProvider,
                    attributes: ["id", "name"],
                },
                {
                    model: ServiceProvided,
                    attributes: { exclude: ["visit_id", "service_id"] },
                    include: [
                        {
                            model: Service,
                            attributes: ["name"],
                            include: [
                                {
                                    model: ServiceCategory,
                                    attributes: ["name"],
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [
                ["id", "asc"], // order first by Visit.id
                [{ model: ServiceProvided }, "id", "asc"], // order second by ServiceProvided.id
            ],
        });

        if (visit != null) {
            res.status(200).json(visit);
        } else {
            res.status(404).json({
                message: `No visit found with id: ${req.params.id}`,
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Read by Pet id
router.get("/bypetid/:id", async (req, res) => {
    try {
        const visits = await Visit.findAll({
            where: { pet_id: req.params.id },
            attributes: { exclude: ["pet_id", "service_provider_id"] },
            include: [
                {
                    model: ServiceProvider,
                    attributes: ["id", "name"],
                },
                {
                    model: ServiceProvided,
                    attributes: { exclude: ["visit_id", "service_id"] },
                    include: [
                        {
                            model: Service,
                            attributes: ["name"],
                            include: [
                                {
                                    model: ServiceCategory,
                                    attributes: ["name"],
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [
                ["id", "asc"], // order first by Visit.id
                [{ model: ServiceProvided }, "id", "asc"], // order second by ServiceProvided.id
            ],
        });

        if (visits != null) {
            res.status(200).json(visits);
        } else {
            res.status(404).json({
                message: `No visit found with id: ${req.params.id}`,
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Read by ServiceProvider id
router.get("/byproviderid/:id/", async (req, res) => {
    try {
        const visits = await Visit.findAll({
            where: { service_provider_id: req.params.id },
            attributes: { exclude: ["pet_id", "service_provider_id"] },
            include: [
                {
                    model: Pet,
                    attributes: ["id", "name"],
                    include: [
                        {
                            model: User,
                            attributes: ["id", "name"],
                        },
                        {
                            model: PetType,
                            attributes: ["name"],
                        },
                    ],
                },
                {
                    model: ServiceProvided,
                    attributes: { exclude: ["visit_id", "service_id"] },
                    include: [
                        {
                            model: Service,
                            attributes: ["name"],
                            include: [
                                {
                                    model: ServiceCategory,
                                    attributes: ["name"],
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [
                ["id", "asc"], // order first by Visit.id
                [{ model: ServiceProvided }, "id", "asc"], // order second by ServiceProvided.id
            ],
        });

        if (visits != null) {
            res.status(200).json(visits);
        } else {
            res.status(404).json({
                message: `No visit found with id: ${req.params.id}`,
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Read by User id
router.get("/byuserid/:id", async (req, res) => {
    try {
        const pets = await Pet.findAll({
            attributes: ["id"],
            where: { owner_id: req.params.id },
            order: [["id", "asc"]],
        });
        const petIds = pets.map(({ id }) => id);

        //console.log('pets:');
        //console.log(pets.map((pet) => pet.get({ plain: true })));
        //console.log('petIds:');
        //console.log(petIds);

        const visits = await Visit.findAll({
            where: { pet_id: petIds },
            attributes: { exclude: ["pet_id", "service_provider_id"] },
            include: [
                {
                    model: Pet,
                    attributes: ["id", "name"],
                },
                {
                    model: ServiceProvider,
                    attributes: ["id", "name"],
                },
                {
                    model: ServiceProvided,
                    attributes: { exclude: ["visit_id", "service_id"] },
                    include: [
                        {
                            model: Service,
                            attributes: ["name"],
                            include: [
                                {
                                    model: ServiceCategory,
                                    attributes: ["name"],
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [
                ["id", "asc"], // order first by Visit.id
                [{ model: ServiceProvided }, "id", "asc"], // order second by ServiceProvided.id
            ],
        });

        if (visits != null) {
            res.status(200).json(visits);
        } else {
            res.status(404).json({
                message: `No visit found with id: ${req.params.id}`,
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update
router.put("/:id", async (req, res) => {
    try {
        const [affectedRowCount] = await Visit.update(req.body, {
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
        const isDeleted = await Visit.destroy({ where: { id: req.params.id } });

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
