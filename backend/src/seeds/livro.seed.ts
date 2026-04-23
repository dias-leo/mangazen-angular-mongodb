import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ILivroCriacao, Livro } from '../models/livro.model';

dotenv.config();

const livros: ILivroCriacao[] = [
  {
    titulo: 'Naruto Vol. 1',
    subtitulo: 'O início de um ninja',
    isbn13: '9780000000001',
    preco: 29.9,
    estoque: 50,
    categorias: ['Mangá', 'Ação'],
    capa: { url: 'https://m.media-amazon.com/images/I/91RpwagB7uL._SL1500_.jpg', textoAlternativo: 'Naruto 1' },
    dataPublicacao: new Date('2000-03-03')
  },
  {
    titulo: 'One Piece Vol. 1',
    subtitulo: 'Romance Dawn',
    isbn13: '9780000000002',
    preco: 32.5,
    estoque: 40,
    categorias: ['Mangá', 'Aventura'],
    capa: { url: 'https://m.media-amazon.com/images/I/61xOtH1kTsL._SL1000_.jpg', textoAlternativo: 'One Piece 1' },
    dataPublicacao: new Date('1997-12-24')
  },
  {
    titulo: 'Dragon Ball Vol. 1',
    subtitulo: 'A busca pelas esferas',
    isbn13: '9780000000003',
    preco: 27.9,
    estoque: 60,
    categorias: ['Mangá', 'Ação'],
    capa: { url: 'https://m.media-amazon.com/images/I/91KQLMVwqBL._SL1500_.jpg', textoAlternativo: 'Dragon Ball 1' },
    dataPublicacao: new Date('1985-09-10')
  },
  {
    titulo: 'Attack on Titan Vol. 1',
    subtitulo: 'A queda da humanidade',
    isbn13: '9780000000004',
    preco: 35,
    estoque: 30,
    categorias: ['Mangá', 'Drama'],
    capa: { url: 'https://m.media-amazon.com/images/I/81qPzeEO5IL._SL1500_.jpg', textoAlternativo: 'AOT 1' },
    dataPublicacao: new Date('2009-03-17')
  },
  {
    titulo: 'Death Note Vol. 1',
    subtitulo: 'Rebirth',
    isbn13: '9780000000005',
    preco: 28,
    estoque: 25,
    categorias: ['Mangá', 'Suspense'],
    capa: { url: 'https://m.media-amazon.com/images/I/612x+rQ0yJL._SL1000_.jpg', textoAlternativo: 'Death Note 1' },
    dataPublicacao: new Date('2003-04-02')
  },
  {
    titulo: 'Jujutsu Kaisen Vol. 1',
    subtitulo: 'Ryomen Sukuna',
    isbn13: '9780000000006',
    preco: 33,
    estoque: 45,
    categorias: ['Mangá', 'Sobrenatural'],
    capa: { url: 'https://m.media-amazon.com/images/I/81TmHlRleJL._SL1500_.jpg', textoAlternativo: 'Jujutsu 1' },
    dataPublicacao: new Date('2018-07-04')
  },
  {
    titulo: 'Chainsaw Man Vol. 1',
    subtitulo: 'Cachorro e motosserra',
    isbn13: '9780000000007',
    preco: 34.9,
    estoque: 20,
    categorias: ['Mangá', 'Ação'],
    capa: { url: 'https://m.media-amazon.com/images/I/71wp0XTXsAL._SL1463_.jpg', textoAlternativo: 'Chainsaw Man 1' },
    dataPublicacao: new Date('2018-12-03')
  },
  {
    titulo: 'Demon Slayer Vol. 1',
    subtitulo: 'Tanjiro Kamado',
    isbn13: '9780000000008',
    preco: 31,
    estoque: 55,
    categorias: ['Mangá', 'Ação'],
    capa: { url: 'https://m.media-amazon.com/images/I/81ZNkhqRvVL._SL1500_.jpg', textoAlternativo: 'Demon Slayer 1' },
    dataPublicacao: new Date('2016-06-03')
  },
  {
    titulo: 'Bleach Vol. 1',
    subtitulo: 'The Death and Strawberry',
    isbn13: '9780000000009',
    preco: 29,
    estoque: 35,
    categorias: ['Mangá', 'Ação'],
    capa: { url: 'https://m.media-amazon.com/images/I/81vbN16NtXL._SL1500_.jpg', textoAlternativo: 'Bleach 1' },
    dataPublicacao: new Date('2001-01-05')
  },
  {
    titulo: 'My Hero Academia Vol. 1',
    subtitulo: 'Izuku Midoriya',
    isbn13: '9780000000010',
    preco: 30,
    estoque: 42,
    categorias: ['Mangá', 'Super-herói'],
    capa: { url: 'https://m.media-amazon.com/images/I/71bELfIWTDL._SL1000_.jpg', textoAlternativo: 'MHA 1' },
    dataPublicacao: new Date('2014-11-04')
  },
  {
    titulo: 'Tokyo Ghoul Vol. 1',
    subtitulo: 'Ken Kaneki',
    isbn13: '9780000000011',
    preco: 36,
    estoque: 18,
    categorias: ['Mangá', 'Horror'],
    capa: { url: 'https://m.media-amazon.com/images/I/81gv-D-LqhL._SL1500_.jpg', textoAlternativo: 'Tokyo Ghoul 1' },
    dataPublicacao: new Date('2011-02-17')
  },
  {
    titulo: 'Fullmetal Alchemist Vol. 1',
    subtitulo: 'Os irmãos Elric',
    isbn13: '9780000000012',
    preco: 33,
    estoque: 28,
    categorias: ['Mangá', 'Fantasia'],
    capa: { url: 'https://m.media-amazon.com/images/I/61yvu+BbxvL._SL1000_.jpg', textoAlternativo: 'FMA 1' },
    dataPublicacao: new Date('2001-07-12')
  },
  {
    titulo: 'Vinland Saga Vol. 1',
    subtitulo: 'Thorfinn',
    isbn13: '9780000000013',
    preco: 39.9,
    estoque: 15,
    categorias: ['Mangá', 'Histórico'],
    capa: { url: 'https://m.media-amazon.com/images/I/91+Qs9DaFZL._SL1500_.jpg', textoAlternativo: 'Vinland Saga 1' },
    dataPublicacao: new Date('2005-04-13')
  },
  {
    titulo: 'Slam Dunk Vol. 1',
    subtitulo: 'Hanamichi Sakuragi',
    isbn13: '9780000000014',
    preco: 28.5,
    estoque: 22,
    categorias: ['Mangá', 'Esporte'],
    capa: { url: 'https://via.placeholder.com/150', textoAlternativo: 'Slam Dunk 1' },
    dataPublicacao: new Date('1990-10-01')
  },
  {
    titulo: 'Gachiakuta Vol. 1',
    subtitulo: 'O mundo do lixo',
    isbn13: '9780000000015',
    preco: 37,
    estoque: 12,
    categorias: ['Mangá', 'Ação'],
    capa: { url: 'https://m.media-amazon.com/images/I/91hPkfq6MLL._SL1500_.jpg', textoAlternativo: 'Gachiakuta 1' },
    dataPublicacao: new Date('2022-02-16')
  },
  {
    titulo: "Hell's Paradise Vol. 1",
    subtitulo: 'Gabimaru',
    isbn13: '9780000000016',
    preco: 35.5,
    estoque: 14,
    categorias: ['Mangá', 'Ação'],
    capa: { url: 'https://m.media-amazon.com/images/I/81keV50g-yL._SL1500_.jpg', textoAlternativo: 'Hells Paradise 1' },
    dataPublicacao: new Date('2018-01-22')
  },
  {
    titulo: 'Black Clover Vol. 1',
    subtitulo: 'Asta e Yuno',
    isbn13: '9780000000017',
    preco: 31.5,
    estoque: 33,
    categorias: ['Mangá', 'Fantasia'],
    capa: { url: 'https://m.media-amazon.com/images/I/91WgpA0pjOL._SL1500_.jpg', textoAlternativo: 'Black Clover 1' },
    dataPublicacao: new Date('2015-02-16')
  },
  {
    titulo: 'Haikyuu!! Vol. 1',
    subtitulo: 'Shoyo Hinata',
    isbn13: '9780000000018',
    preco: 30,
    estoque: 27,
    categorias: ['Mangá', 'Esporte'],
    capa: { url: 'https://m.media-amazon.com/images/I/61AU5L7LvRL._SL1000_.jpg', textoAlternativo: 'Haikyuu 1' },
    dataPublicacao: new Date('2012-06-04')
  },
  {
    titulo: 'Blue Lock Vol. 1',
    subtitulo: 'Egoísmo no futebol',
    isbn13: '9780000000019',
    preco: 34,
    estoque: 19,
    categorias: ['Mangá', 'Esporte'],
    capa: { url: 'https://m.media-amazon.com/images/I/81Z85oL1xvL._SL1500_.jpg', textoAlternativo: 'Blue Lock 1' },
    dataPublicacao: new Date('2018-08-01')
  },
  {
    titulo: 'Spy x Family Vol. 1',
    subtitulo: 'Família Forger',
    isbn13: '9780000000020',
    preco: 32,
    estoque: 38,
    categorias: ['Mangá', 'Comédia'],
    capa: { url: 'https://m.media-amazon.com/images/I/71vMGRog+iL._SL1500_.jpg', textoAlternativo: 'Spy x Family 1' },
    dataPublicacao: new Date('2019-03-25')
  },
  {
    titulo: 'Fire Force Vol. 1',
    subtitulo: 'Combate ao fogo',
    isbn13: '9780000000021',
    preco: 33.5,
    estoque: 21,
    categorias: ['Mangá', 'Ação'],
    capa: { url: 'https://m.media-amazon.com/images/I/91YQcOg7RiL._SL1500_.jpg', textoAlternativo: 'Fire Force 1' },
    dataPublicacao: new Date('2015-09-23')
  },
  {
    titulo: 'Dr. Stone Vol. 1',
    subtitulo: 'Reiniciando a humanidade',
    isbn13: '9780000000022',
    preco: 31,
    estoque: 26,
    categorias: ['Mangá', 'Sci-Fi'],
    capa: { url: 'https://m.media-amazon.com/images/I/91SLpHwjp8L._SL1500_.jpg', textoAlternativo: 'Dr Stone 1' },
    dataPublicacao: new Date('2017-07-06')
  },
  {
    titulo: 'Mob Psycho 100 Vol. 1',
    subtitulo: 'Poderes psíquicos',
    isbn13: '9780000000023',
    preco: 29.5,
    estoque: 24,
    categorias: ['Mangá', 'Comédia'],
    capa: { url: 'https://m.media-amazon.com/images/I/91nunbvU04L._SL1500_.jpg', textoAlternativo: 'Mob Psycho 1' },
    dataPublicacao: new Date('2012-04-18')
  },
  {
    titulo: 'Parasyte Vol. 1',
    subtitulo: 'Parasitas',
    isbn13: '9780000000024',
    preco: 34.5,
    estoque: 17,
    categorias: ['Mangá', 'Horror'],
    capa: { url: 'https://m.media-amazon.com/images/I/81mcLwpxXSL._SL1500_.jpg', textoAlternativo: 'Parasyte 1' },
    dataPublicacao: new Date('1989-01-01')
  },
  {
    titulo: 'Akira Vol. 1',
    subtitulo: 'Neo Tokyo',
    isbn13: '9780000000025',
    preco: 45,
    estoque: 10,
    categorias: ['Mangá', 'Cyberpunk'],
    capa: { url: 'https://m.media-amazon.com/images/I/61ud5BuLRML._SL1000_.jpg', textoAlternativo: 'Akira 1' },
    dataPublicacao: new Date('1982-12-20')
  }
];

async function seed() {
  try {
    const mongoUri = process.env.URL_BANCO;

    if (!mongoUri) {
      throw new Error('URL_BANCO não definida');
    }

    await mongoose.connect(mongoUri);
    console.log('Mongo conectado');

    await Livro.deleteMany({});
    console.log('Coleção limpa');

    await Livro.insertMany(livros);
    console.log('Seed executado com sucesso');

  } catch (error) {
    console.error('Erro no seed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Conexão encerrada');
  }
}

seed();