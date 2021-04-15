import Layout from '../components/Layout';
import Book from 'components/Book';

const BookPage = () => {
  return (
    <Layout title="Calendario | Meetspot" privateRoute>
      <Book />
    </Layout>
  );
};

export default BookPage;
