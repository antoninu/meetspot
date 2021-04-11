import Layout from '../components/Layout';
import Calendar from 'components/Calendar';

const CalendarPage = (): JSX.Element => {
  return (
    <Layout title="Calendario | Meetspot" privateRoute>
      <Calendar />
    </Layout>
  );
};

export default CalendarPage;
