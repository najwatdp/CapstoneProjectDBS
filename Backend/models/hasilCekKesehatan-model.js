import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import CekKesehatan from './cekKesehatan-model.js';

const PertanyaanKesehatan = db.define('pertanyaan_kesehatan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_cek_kesehatan: {
        type: DataTypes.INTEGER,
        references: {
            model: CekKesehatan,
            key: 'id',
        },
        allowNull: false,
    },
    block_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Urutan pertanyaan'
    },
    block_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Nama blok pertanyaan seperti Block-START---Q1'
    },
    pertanyaan: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'Teks pertanyaan yang ditampilkan'
    },
    tipe_jawaban: {
        type: DataTypes.ENUM('multiple_choice', 'yes_no', 'scale', 'text'),
        allowNull: false,
        defaultValue: 'multiple_choice'
    },
    opsi_jawaban: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Array berisi opsi jawaban dan nilai skornya'
    },
    kondisi_next: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Logika untuk menentukan pertanyaan selanjutnya berdasarkan jawaban'
    },
    is_final: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Apakah ini pertanyaan terakhir'
    }
}, {
    tableName: 'pertanyaan_kesehatan',
    timestamps: true,
});

// Model untuk menyimpan hasil akhir berdasarkan skor
const HasilKesehatan = db.define('hasil_kesehatan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_cek_kesehatan: {
        type: DataTypes.INTEGER,
        references: {
            model: CekKesehatan,
            key: 'id',
        },
        allowNull: false,
    },
    min_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    max_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    level_risiko: {
        type: DataTypes.ENUM('rendah', 'sedang', 'tinggi'),
        allowNull: false,
    },
    judul_hasil: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    deskripsi_hasil: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    saran: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'hasil_kesehatan',
    timestamps: true,
});

// Model untuk menyimpan session user (opsional, untuk tracking)
const SessionCekKesehatan = db.define('session_cek_kesehatan', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    id_cek_kesehatan: {
        type: DataTypes.INTEGER,
        references: {
            model: CekKesehatan,
            key: 'id',
        },
        allowNull: false,
    },
    current_block: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    jawaban_user: {
        type: DataTypes.JSON,
        comment: 'Menyimpan jawaban user dalam format JSON'
    },
    total_score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.ENUM('in_progress', 'completed'),
        defaultValue: 'in_progress',
    }
}, {
    tableName: 'session_cek_kesehatan',
    timestamps: true,
});

// Definisi relasi
PertanyaanKesehatan.belongsTo(CekKesehatan, { foreignKey: 'id_cek_kesehatan' });
HasilKesehatan.belongsTo(CekKesehatan, { foreignKey: 'id_cek_kesehatan' });
SessionCekKesehatan.belongsTo(CekKesehatan, { foreignKey: 'id_cek_kesehatan' });

CekKesehatan.hasMany(PertanyaanKesehatan, { foreignKey: 'id_cek_kesehatan' });
CekKesehatan.hasMany(HasilKesehatan, { foreignKey: 'id_cek_kesehatan' });

export { PertanyaanKesehatan, HasilKesehatan, SessionCekKesehatan};