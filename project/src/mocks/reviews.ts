import {Reviews} from '../types/reviews';

export const reviews: Reviews = [
  {
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed films in years.',
    date: new Date('December 24, 2016'),
    id: 1,
    rating: 8.9,
    user: {
      id: 1,
      name: 'Kate Muir',
    },
  },
  {
    comment: 'Anderson\'s films are too precious for some, but for those of us willing to lose ourselves in them, they\'re a delight. The Grand Budapest Hotel is no different, except that he has added a hint of gravitas to the mix, improving the recipe.',
    date: new Date('November 18, 2015'),
    id: 2,
    rating: 8.0,
    user: {
      id: 2,
      name: 'Bill Goodykoontz',
    },
  },
  {
    comment: 'I didn\'t find it amusing, and while I can appreciate the creativity, it\'s an hour and 40 minutes I wish I could take back.',
    date: new Date('November 18, 2015'),
    id: 3,
    rating: 8.0,
    user: {
      id: 3,
      name: 'Amanda Greever',
    },
  },
  {
    comment: 'The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.',
    date: new Date('December 20, 2016'),
    id: 4,
    rating: 7.2,
    user: {
      id: 4,
      name: 'Matthew Lickona',
    },
  },
  {
    comment: 'It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.',
    date: new Date('December 20, 2016'),
    id: 5,
    rating: 7.6,
    user: {
      id: 5,
      name: 'Paula Fleri-Soler',
    },
  },
  {
    comment: 'It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.',
    date: new Date('December 20, 2016'),
    id: 6,
    rating: 7.0,
    user: {
      id: 5,
      name: 'Paula Fleri-Soler',
    }
  },
];
