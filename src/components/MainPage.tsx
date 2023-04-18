import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { getUserData } from "../redux/actions";
import { setActiveChat } from "../redux/reducers";

const MainPage = () => {
  const dispatch = useAppDispatch()

  const bla = async () => {
    const data1 = await dispatch(getUserData())
    console.log("dispatch shenanigans", data1)

    await dispatch(setActiveChat("1"))
  }

  useEffect(() => {
    bla() //this obviously can't stay, is just for testing purposes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage])

  return (
    <>
      <p>MainPage</p>
    </>
  );
};

export default MainPage;
