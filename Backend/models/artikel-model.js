import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import KategoriKesehatan from './kategori-kesehatan.js';

// Definisi Model Artikel
const Artikel = db.define('artikel', {
    ketegori_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'kategori_kesehatan', // Nama tabel, bukan model JS
        key: 'id',
        },
    },
    images: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isi: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('publish', 'draft'),
        allowNull: false,
    },
    }, {
    tableName: 'artikel',
    timestamps: false,
    });

    // Relasi Artikel -> belongsTo -> KategoriKesehatan
    Artikel.belongsTo(KategoriKesehatan, {
    foreignKey: 'ketegori_id',
    as: 'kategori',
    });

    // Relasi KategoriKesehatan -> hasMany -> Artikel
    KategoriKesehatan.hasMany(Artikel, {
    foreignKey: 'ketegori_id',
    as: 'artikels',
    });

export default Artikel;
