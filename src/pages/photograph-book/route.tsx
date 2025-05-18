import './styles.css';

import FlipBook, { type Page } from './components/FlipBook';

const pages: Page[] = [
  {
    id: '1',
    type: 'page',
    photoUrl: 'https://picsum.photos/id/100/200/300',
  },
  {
    id: '2',
    type: 'page',
    photoUrl: 'https://picsum.photos/id/101/200/300',
  },
  {
    id: '3',
    type: 'page',
    photoUrl: 'https://picsum.photos/id/102/200/300',
  },
  {
    id: '4',
    type: 'page',
    photoUrl: 'https://picsum.photos/id/103/200/300',
  },
];

export default function PhotographBook() {
  return (
    <div className="container-photograph-book">
      <FlipBook
        pages={pages}
        bookName="Photograph Book"
        coverImageUrl="https://picsum.photos/id/99/200/300"
        bgColor="#8c8924"
      />
    </div>
  );
}
