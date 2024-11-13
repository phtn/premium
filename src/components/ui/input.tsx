import { type DualIcon } from "@/types";
import { toggleState, opts } from "@/utils/helpers";
import { EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";
import { EyeIcon, LockOpenIcon } from "lucide-react";
import {
  forwardRef,
  useState,
  useCallback,
  type InputHTMLAttributes,
} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: DualIcon;
}

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-[50px] w-full items-center rounded-md border-[0.33px] border-primary-400 bg-white pl-3 shadow-default/30 drop-shadow-md focus-within:border focus-within:border-success focus-within:ring-offset-0 active:border-success",
          className,
        )}
      >
        {props.icon ? (
          <props.icon className="mr-[10px] size-5 stroke-1 text-foreground/60" />
        ) : null}

        <input
          {...props}
          type={type}
          ref={ref}
          className="h-[42px] w-full rounded-md bg-transparent px-2 font-sans text-[16px] font-normal tracking-normal placeholder:text-clay/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    );
  },
);
InputField.displayName = "InputField";

export const LoginField = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const toggleVisible = () => toggleState(setVisible);

    const IconOptions = useCallback(() => {
      const options = opts(
        <EyeIcon className="size-[16px] text-cyan-600" />,
        <EyeSlashIcon className="size-[16px]" />,
      );
      return (
        <Button
          variant={`ghost`}
          className="text-neutral-500 hover:text-cyan-600"
          onClick={toggleVisible}
        >
          {options.get(visible)}
        </Button>
      );
    }, [visible]);

    const LockOptions = useCallback(() => {
      const options = opts(
        <LockOpenIcon className="size-[16px] text-cyan-600" />,
        <LockClosedIcon className="size-[16px]" />,
      );
      return (
        <Button
          variant={`ghost`}
          className="mr-[10px] p-0 text-neutral-500 hover:text-cyan-600"
          onClick={toggleVisible}
        >
          {options.get(visible)}
        </Button>
      );
    }, [visible]);

    return (
      <div
        className={cn(
          "flex h-[56px] w-full items-center rounded-xl border-[0.33px] border-neutral-300 bg-background pl-3 focus-within:border focus-within:border-cyan-500 focus-within:ring-offset-0 active:border-neutral-300",
          className,
        )}
      >
        {type === "password" ? (
          <LockOptions />
        ) : props.icon ? (
          <props.icon className="mr-[10px] h-[16px] w-[16px] text-clay" />
        ) : null}

        <input
          {...props}
          type={visible ? "text" : type}
          ref={ref}
          className="h-[44px] w-full rounded-lg bg-transparent px-2 font-sans text-[14px] font-normal tracking-normal placeholder:text-clay/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        {type === "password" ? <IconOptions /> : null}
      </div>
    );
  },
);
LoginField.displayName = "LoginField";
