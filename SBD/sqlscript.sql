REM   Script: DDL-SBD TM8
REM   DDL

CREATE TABLE kelompokfilm 
( 
	jenis VARCHAR(255) NOT NULL, 
	harga_sewa INT NOT NULL, 
	PRIMARY KEY (jenis) 
);

CREATE TABLE customer 
( 
	no_identitas VARCHAR(255) NOT NULL, 
	jenis_identitas VARCHAR(255) NOT NULL, 
	nama VARCHAR(255) NOT NULL, 
	alamat VARCHAR(255) NOT NULL, 
	PRIMARY KEY (no_identitas) 
);

CREATE TABLE film  
(  
	kode_film VARCHAR(255) NOT NULL,  
	jenis_film VARCHAR(255) NOT NULL, 
	judul VARCHAR(255) NOT NULL,  
	jml_keping INT NOT NULL,  
	jml_film INT NOT NULL, 
	PRIMARY KEY (kode_film), 
	FOREIGN KEY (jenis_film) REFERENCES kelompokfilm(jenis) 
);

CREATE TABLE menyewa 
( 
	kode_sewa VARCHAR(255) NOT NULL, 
	no_identitas VARCHAR(255) NOT NULL, 
	tgl_sewa DATE NOT NULL, 
	tot_film INT NOT NULL, 
	tgl_kembali DATE NOT NULL, 
	tot_hrg INT NOT NULL, 
	denda INT NOT NULL, 
	PRIMARY KEY (kode_sewa), 
	FOREIGN KEY (no_identitas) REFERENCES customer(no_identitas) 
);

CREATE TABLE detailmenyewa 
( 
	kode_sewa VARCHAR(255) NOT NULL, 
	kode_film VARCHAR(255) NOT NULL, 
	PRIMARY KEY (kode_sewa, kode_film), 
	FOREIGN KEY (kode_sewa) REFERENCES menyewa(kode_sewa), 
	FOREIGN KEY (kode_film) REFERENCES film(kode_film) 
);

INSERT INTO kelompokfilm VALUES ('action', 3000);

INSERT INTO kelompokfilm VALUES ('drama', 3500);

INSERT INTO kelompokfilm VALUES ('horor', 3000);

INSERT INTO customer VALUES ('001', 'SIM', 'Andi', 'pontianak');

INSERT INTO customer VALUES ('002', 'SIM', 'Budi', 'pontianak');

INSERT INTO film VALUES ('A01', 'action', 'Spiderman', 2, 3);

INSERT INTO film VALUES ('A02', 'action', 'Spiderman 2', 2, 5);

INSERT INTO film VALUES ('D01', 'drama', 'Love Story', 2, 3);

INSERT INTO film VALUES ('H01', 'horor', 'Evil Death', 2, 2);

INSERT INTO menyewa (kode_sewa, no_identitas, tgl_sewa, tot_film, tgl_kembali, tot_hrg, denda)  
VALUES ('S0001', '001', DATE '2007-01-01', 2, DATE '2007-01-02', 6000, 0);

INSERT INTO menyewa (kode_sewa, no_identitas, tgl_sewa, tot_film, tgl_kembali, tot_hrg, denda)  
VALUES ('S0002', '002', DATE '2007-01-03', 1, DATE '2007-01-03', 3500, 0);

INSERT INTO menyewa (kode_sewa, no_identitas, tgl_sewa, tot_film, tgl_kembali, tot_hrg, denda)  
VALUES ('S0003', '001', DATE '2007-01-06', 3, DATE '2007-01-08', 9500, 0);

INSERT INTO detailmenyewa VALUES ('S0001', 'A01');

INSERT INTO detailmenyewa VALUES ('S0001', 'A02');

INSERT INTO detailmenyewa VALUES ('S0002', 'D01');

INSERT INTO detailmenyewa VALUES ('S0003', 'A02');

INSERT INTO detailmenyewa VALUES ('S0003', 'D01');

INSERT INTO detailmenyewa VALUES ('S0003', 'H01');

SELECT * FROM kelompokfilm;

SELECT * FROM customer;

SELECT * FROM film;

SELECT * FROM menyewa;

SELECT * FROM detailmenyewa;

ALTER TABLE customer 
ADD no_hp VARCHAR(255);

SELECT * FROM customer;

ALTER TABLE customer 
RENAME COLUMN no_hp TO no_wa;

SELECT * FROM customer;

ALTER TABLE customer 
DROP COLUMN no_wa;

SELECT * FROM customer;

