import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader,
   } from "../ui/card"
  import AuthHeader from "./auth-header"
  import AuthLink from "./auth-link"
import Social from "./social"

  interface CardWrapperProps {
    header: string,
    backButtonHref: string,
    backButtonLabel: string,
    children: React.ReactNode,
    showSocial?: boolean
  }
  //NOTE TODO NEXT: create auth header component for conditional styling 
  //create back button 
  //consider renaming to Form Wrapper since this card wraps the forms 
  //rule of thumb for breaking down components 
  //blocks containing info such as props, with their own containerized styling,
  // can be extracted into their own component : ex. AuthHeader 
  const CardWrapper = ({
    header,
    backButtonHref,
    backButtonLabel,
    children,
    showSocial,
  }: CardWrapperProps) => {
    return (
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <AuthHeader label={header}/>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {showSocial && (
          <CardFooter className="flex-col">
            <Social/>
            <AuthLink label={backButtonLabel} href={backButtonHref}/>
          </CardFooter>
        )}

      </Card>
    )
  }
  
  export default CardWrapper