import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../../config/firebase.config";
import toast from "react-hot-toast";
import { MdOutlineAttachEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { SiSkyrock } from "react-icons/si";
import FloatBtnComp from "../FloatBtn";
import InputComp from "../Input";
import { useTranslation } from "react-i18next";
import "../../config/i18Next";

export let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export let passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function SignupLoginFormPage() {
  const [type, setType] = useState("card");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const { t } = useTranslation();

  //Registering User
  const registerUser = async () => {
    if (signupEmail === "") {
      toast.error("Please provide email.");
    } else if (!emailRegex.test(signupEmail)) {
      toast.error("Invalid email.");
    } else if (signupPassword === "") {
      toast.error("Please provide password.");
    } else if (!passwordRegex.test(signupPassword)) {
      toast.error(
        "Password must be One uppercase, one lowerCase, one digit and one special character. Length should be 8."
      );
    } else {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          toast.success("Signup successfully.");
          setSignupEmail("");
          setSignupPassword("");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            toast.error("Email already registerd. Please login!");
            return;
          }
          toast.error("Please try again");
        });
    }
  };

  //Signin User
  const signinUser = () => {
    if (signinEmail === "") {
      toast.error("Please provide email.");
    } else if (!emailRegex.test(signinEmail)) {
      toast.error("Invalid email.");
    } else if (signinPassword === "") {
      toast.error("Please provide password.");
    } else if (!passwordRegex.test(signinPassword)) {
      toast.error("Invlaid password.");
    } else {
      signInWithEmailAndPassword(auth, signinEmail, signinPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Signin successfully.");
          setSigninEmail("");
          setSigninPassword("");
        })
        .catch((error) => {
          toast.error("Please try again.");
        });
    }
  };

  return (
    <div className="w-[100%] flex justify-center items-center min-h-screen dark:bg-darkPrimary dark:text-darkSecondary">
      <Card className="w-full sm:w-[60%] md:w-[60%] lg:w-[35%]">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="bg-secondary dark:bg-darkPrimary m-0 grid place-items-center px-4 py-8 text-center"
        >
          <div className="mb-4 w-full h-20 p-6 text-white flex justify-center items-center">
            {type === "card" ? (
              <SiSkyrock className="h-20 w-20 text-white" />
            ) : (
              <SiSkyrock className="h-20 w-20 text-white" />
            )}
          </div>
          <Typography variant="h5" color="white">
            {t("appName")}
          </Typography>
        </CardHeader>
        <CardBody className="w-full">
          <Tabs value={type}>
            <TabsHeader className="relative z-0 ">
              <Tab value="card" onClick={() => setType("card")}>
                {t("signup")}
              </Tab>
              <Tab value="paypal" onClick={() => setType("paypal")}>
                {t("signin")}
              </Tab>
            </TabsHeader>
            <TabsBody
              animate={{
                initial: {
                  x: type === "card" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "card" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="card" className="p-0">
                <form className="mt-12 flex flex-col gap-4">
                  <InputComp
                    inputType="email"
                    inputValue={signupEmail}
                    inputOnChange={(e) => setSignupEmail(e.target.value)}
                    inputPlaceHolder="name@gmail.com"
                    inputAddonAfter={
                      <MdOutlineAttachEmail className="dark:text-darkSecondary" />
                    }
                  />
                  <div className="my-3">
                    <InputComp
                      inputType="password"
                      inputValue={signupPassword}
                      inputOnChange={(e) => setSignupPassword(e.target.value)}
                      inputPlaceHolder=" ******* "
                    />
                  </div>
                  <Button
                    size="lg"
                    className="bg-secondary dark:bg-darkPrimary dark:text-darkSecondary"
                    onClick={registerUser}
                  >
                    {t("signup")}
                  </Button>
                </form>
              </TabPanel>
              <TabPanel value="paypal" className="p-0">
                <form className="mt-12 flex flex-col gap-4">
                  <div className="w-full">
                    <InputComp
                      inputType="email"
                      inputValue={signinEmail}
                      inputOnChange={(e) => setSigninEmail(e.target.value)}
                      inputPlaceHolder="name@gmail.com"
                      inputAddonAfter={
                        <MdOutlineAttachEmail className="dark:text-darkSecondary " />
                      }
                    />
                  </div>
                  <div className="my-3 w-full">
                    <InputComp
                      inputType="password"
                      inputValue={signinPassword}
                      inputOnChange={(e) => setSigninPassword(e.target.value)}
                      inputPlaceHolder=" ******* "
                    />
                  </div>
                  <Button
                    size="lg"
                    className="bg-secondary dark:bg-darkPrimary dark:text-darkSecondary"
                    onClick={signinUser}
                  >
                    {t("signin")}
                  </Button>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
      <FloatBtnComp />
    </div>
  );
}
