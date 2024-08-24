import { InputHTMLAttributes } from "react";
import { UiButton } from "../button/UiButton";
import { UiInput } from "../input/UiInput";
import classes from './UiAmountSelect.module.scss'

interface AmountSelectProps extends InputHTMLAttributes<HTMLInputElement> {
  onMinus: () => void;
  onPlus: () => void;
}

export function UiAmountSelect({
  onMinus,
  onPlus,
  ...props
}: AmountSelectProps) {
  return (
    <div className={classes.amount__wrapper}>
      <UiButton theme="dark" onClick={onMinus}>
        -
      </UiButton>
      <UiInput
        type="number"
        min={1}
        onKeyDown={(e) =>
          ["E", "e", "-", "+", "."].includes(e.key) && e.preventDefault()
        }
        value={props.value}
        onChange={props.onChange}
      />
      <UiButton theme="dark" onClick={onPlus}>
        +
      </UiButton>
    </div>
  );
}
