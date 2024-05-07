import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
    message?: string;
}

const FormError = ({ message }: FormErrorProps) => {

  if (!message) return null;

  return (
    <div className="flex items-center bg-emerald-500/15 p-3 rounded-md gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="h-4 w-4"/>
      <p>{message}</p>
    </div>
  )
}

export default FormError