const Joi = require("joi");

const notesSchema = Joi.object({
    note: Joi.string().min(1).required().messages({
        "string.base": "Must be string",
        "string.empty": "Cannot be empty",
        "any.required": "Cannot be empty"
    })
});

function validateNotes(req, res, next){
    const { error } = notesSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        return res.status(400).json({error: errorMessage})
    }

    next();
}

function validateIndex(req, res, next){
    const id = parseInt(req.params.id);

    if (isNaN(id) || id <=0 ){
        return res.status(400)
                  .json({ error: "Invalid book ID. ID must be a positive number" });
    }

    next();
}

module.exports = {
    validateNotes,
    validateIndex
}