import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function Protected() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
  console.log(user);

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
    queryClient.setQueryData(["user"], JSON.parse(user))
  }, [])

  if (user === null) {
    return null;
  }

  return (
    <>
      {user !== null ? <Outlet /> : null}
    </>
  )
}
export default Protected;