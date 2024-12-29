// const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // // const [login, { isLoading }] = useLoginMutation();

  // const { userInfo } = useSelector((state) => state.auth);
  // const { search } = useLocation();
  // const sp = new URLSearchParams(search);
  // const redirect = sp.get("redirect") || "/";

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [userInfo, redirect, navigate]);

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await login({ email, password }).unwrap();
  //     dispatch(
  //       setCredentials({
  //         ...res,
  //       })
  //     );
  //     navigate(redirect);
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };