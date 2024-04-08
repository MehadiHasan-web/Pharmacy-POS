
import Today from './today/page';
import Yesterday from './yesterday/page';
import Weekly from './weekly/page';
import Month from './month/page';
import UnitAlerts from './unitalerts/page';
import getDashboard from '@/lib/getDashboard';


const Dashboard = async () => {

  const data = await getDashboard()
  return (
    <div className='p-5'>
      <div>
        <Today data={data}></Today>
        <Yesterday data={data}></Yesterday>
        <Weekly data={data}></Weekly>
        <Month data={data}></Month>
        <UnitAlerts data={data}></UnitAlerts>
      </div>
    </div>
  );
};

export default Dashboard;