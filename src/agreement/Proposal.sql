-- Tabla proposal
CREATE TABLE proposal (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID único de la propuesta
    documents LONGBLOB NOT NULL,       -- Archivos MIME almacenados como binarios largos
    offerent_id BIGINT  NOT NULL,        -- IDs de oferentes almacenados en formato JSON
    demand_id BIGINT NOT NULL,          -- IDs de demandantes almacenados en formato JSON
    proposed_validity_days INT NOT NULL, -- Días de validez propuestos
    currency VARCHAR(10) NOT NULL,    -- Moneda (cadena de caracteres)
    offering TEXT NOT NULL,           -- Oferta en formato de texto largo
);
