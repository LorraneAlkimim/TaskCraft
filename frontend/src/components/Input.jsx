import { useId, forwardRef } from "react";

export const Input = forwardRef(({ defaultId, label, multiline, errorMessage, ...rest }, ref) => {
  const randomId = useId();
  const id = defaultId ?? randomId;

  return (
    <fieldset className="flex flex-col gap-2">
      <label htmlFor={id} className="text-gray-700 font-semibold">
        {label}
      </label>
      {multiline ? (
        <textarea
          {...rest}
          id={id}
          className="border rounded-md py-3 px-4 min-h-28"
          ref={ref}
        />
      ) : (
        <input {...rest} id={id} ref={ref} className="border rounded-md py-3 px-4" />
      )}
      {errorMessage ? (
        <p className="text-red-400 text-base">{errorMessage}</p>
      ) : null}
    </fieldset>
  );
});
