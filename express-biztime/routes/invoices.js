const express = require("express");
const router = express.Router();

const db = require("../db");


//list invoices
router.get("/", async (req, res, next) => {
    try {
        const result = await db.query('SELECT code, date, company_code, customer_code, total FROM invoices');
        return res.json({invoices: result.rows});
    } catch (err) {
        return next(err);
    }
});

//invoice details
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await db.query(`
            SELECT i.id, i.comp_code, i.amt, i.paid, i.add_date, i.paid_date, c.code, c.name, c.description
            FROM invoices AS i
            JOIN companies AS c ON i.comp_code = c.code
            WHERE i.id = $1`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({error: "Invoice not found"});
        }
        
        const invoice = result.rows[0];
        invoice.company = {
            code: invoice.code,
            name: invoice.name,
            description: invoice.description
        };
        delete invoice.code;
        delete invoice.name;
        delete invoice.description;

        return res.json({invoice: invoice});
    } catch (err)  {
        return next(err);
    }
});

//add invoice
router.post("/", async (req, res, next) => {
    try {
        const { comp_code, amt } = req.body;
        const result = await db.query(`
        INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date`, 
        [comp_code, amt]);

        return res.json({invoice: result.rows[0]});
    } catch (err) {
        return next(err);
    }
});

//edit invoice
router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { comp_code, amt, paid, add_date, paid_date } = req.body;
        const result = await db.query(`
        UPDATE invoices SET comp_code = $1, amt = $2, paid = $3, add_date = $4, paid_date = $5 WHERE id = $6 RETURNING id, comp_code, amt, paid, add_date, paid_date`,
        [comp_code, amt, paid, add_date, paid_date, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({error: "Invoice not found"});
        }

        return res.json({invoice: result.rows[0]});
    } catch (err) {
        return next(err);
    }
});

//delete invoice
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await db.query(`
        DELETE FROM invoices WHERE id = $1 RETURNING id`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({error: "Invoice not found"});
        }

        return res.json({invoice: result.rows[0]});
    } catch (err) {
        return next(err);
    }
});


module.exports = router;