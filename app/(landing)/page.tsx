import NavBar from '@/components/landing/navBar';
import Welcome from '@/components/landing/welcome';

export default async function Index() {

  return (
    <>
      <div>
        <NavBar />
        <Welcome />
      </div>
    </>
  );
}
