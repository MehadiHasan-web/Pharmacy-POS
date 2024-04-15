
import Days from '@/app/componentes/Days';
import UnitAlerts from '@/app/componentes/UnitAlerts';
import getDashboard from '@/lib/getDashboard';



const Dashboard = async () => {

  const data = await getDashboard()

  return (
    <div className='p-5'>
      <div>
        <h1>dashboard</h1>
        {/* today */}
          <Days day={'Today'} unit={data?.total_unit_sold?.today} amount={data?.total_amount_sold?.today} sales={data?.total_sales_return?.today}></Days>
          {/* week */}
          <Days day={'Week'} unit={data?.total_unit_sold?.week} amount={data?.total_amount_sold?.week} sales={data?.total_sales_return?.week}></Days>
          {/* month */}
          <Days day={'Month'} unit={data?.total_unit_sold?.month} amount={data?.total_amount_sold?.month} sales={data?.total_sales_return?.month}></Days>
          {/* yesterday */}
          {/* unitalerts */}
          <Days day={'Yesterday'} unit={data?.total_unit_sold?.yesterday} amount={data?.total_amount_sold?.yesterday} sales={data?.total_sales_return?.yesterday}></Days>
        <UnitAlerts data={data}></UnitAlerts>
      </div>
    </div>
  );
};

export default Dashboard;