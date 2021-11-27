import { useRouter } from "next/router";

export default function Redirect({ to }) {
  const router = useRouter();
  //console.log("in useEffect");
  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}
