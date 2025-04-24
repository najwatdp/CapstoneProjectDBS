import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const Penyakit = db.define('penyakit', {
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    deskripsi: {
        type: DataTypes.TEXT,
    },
    gejala: {
        type: DataTypes.JSON, 
    },
    penyebab: {
        type: DataTypes.JSON,
    },
    pencegahan: {
        type: DataTypes.JSON,
    },
    pengobatan: {
        type: DataTypes.JSON,
    },
    faktor_resiko: {
        type: DataTypes.JSON,
        field: 'faktor'
    }
    }, {
    tableName: 'penyakit',
    timestamps: true,
});


export default Penyakit;
