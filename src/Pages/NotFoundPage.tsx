import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>페이지 없슈</h1>
      <button onClick={() => navigate('/')}>홈으로</button>
    </>
  );
};

export default NotFoundPage;
