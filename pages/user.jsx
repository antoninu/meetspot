import Layout from '../components/Layout';
import User from 'components/User';

const UserPage = () => {
  return (
    <Layout title="Calendario | Meetspot" privateRoute>
      <User />
    </Layout>
  );
};

export default UserPage;
