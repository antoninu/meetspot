import Layout from '../components/Layout';
import Calendar from 'components/Calendar';

const CalendarPage = () => {
  return (
    <Layout title="Calendario | Meetspot" privateRoute>
      <Calendar />
    </Layout>
  );
};

export default CalendarPage;
