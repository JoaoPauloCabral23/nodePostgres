CREATE TABLE jogos (
    id         SERIAL PRIMARY KEY,
    titulo     VARCHAR(100) NOT NULL,
    genero     VARCHAR(50),
    nota       DECIMAL(3,1),
    lancamento INTEGER
);

INSERT INTO jogos (titulo, genero, nota, lancamento) VALUES
    ('Elden Ring',            'RPG',          9.5, 2022),
    ('God of War Ragnarok',   'Acao',          9.0, 2022),
    ('Hollow Knight',         'Metroidvania',  9.2, 2017),
    ('Celeste',               'Plataforma',    9.0, 2018),
    ('Cyberpunk 2077',        'RPG',           7.5, 2020),
    ('Red Dead Redemption 2', 'Acao',          9.7, 2018),
    ('Hades',                 'Roguelike',     9.3, 2020),
    ('Stardew Valley',        'Simulacao',     9.4, 2016);