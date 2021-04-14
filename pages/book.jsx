import Layout from '../components/Layout';
import Book from 'components/Book';

const BookPage = (): JSX.Element => {
  return (
    <Layout title="Calendario | Meetspot" privateRoute>
      <Book />
    </Layout>
  );
};

export default BookPage;
