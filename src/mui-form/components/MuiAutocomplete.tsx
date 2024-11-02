/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete,
  AutocompleteProps,
  TextFieldProps,
  TextField
} from '@mui/material';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps
} from 'react-hook-form';

type AutocompleteOption = {
  label: string;
};

type MuiAutocompleteProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
  /** Additional settings */
  config?: {
    /**
     * Whether to display error messages below the input field.
     * If `true`, message displays.
     * @defaultValue `false`
     */
    displayErrorMessage?: boolean;
    /**
     * Whether to manage value with label string.
     * @defaultValue `false`
     */
    manageWithLabel?: boolean;
  };
  /** Settings for MUI elements */
  muiProps?: {
    /**
     * Settings for Autocomplete inside MuiAutocomplete.
     *
     * API: {@link https://mui.com/material-ui/api/autocomplete/}
     */
    autocompleteProps?: Omit<
      AutocompleteProps<AutocompleteOption, undefined, undefined, undefined>,
      'renderInput'
    >;
    /**
     * Settings for TextField inside MuiAutocomplete
     *
     * API: {@link https://mui.com/material-ui/api/text-field/}
     */
    textFieldProps?: TextFieldProps;
  };
};

/**
 * MUI Autocomplete component linked to React Hook Form.
 * Type arguments are optional, but specifying them provides powerful type checking and type inference.
 * @typeParam TFieldValues - Type of the form.
 * @typeParam TName - Field name.
 * @example
 * ```
 * type FormData = {
 *   film: string;
 * };
 *
 * <MuiAutocomplete<FormData, 'film'>
 *   name='film'
 *   control={control}
 *   rules={{
 *     required: 'Enter your favorite film.'
 *   }}
 *   config={{
 *     displayErrorMessage: true
 *   }}
 *   muiProps={{
 *     autocompleteProps: {
 *       disablePortal: true,
 *       options: [
 *         { label: 'The Dark Knight', year: 2008 },
 *         { label: 'The Matrix', year: 1999 },
 *         { label: 'Back to the Future', year: 1985 }
 *       ]
 *     },
 *     textFieldProps: {
 *       label: 'Favorite Film'
 *     }
 *   }}
 * />
 * ```
 */
export const MuiAutocomplete: <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: MuiAutocompleteProps<TFieldValues, TName>
) => JSX.Element = (props) => {
  const { muiProps, config, ...others } = props;
  const { autocompleteProps, textFieldProps } = muiProps ?? {};
  const { field, fieldState } = useController(others);

  return (
    <Autocomplete
      {...autocompleteProps}
      id={autocompleteProps?.id}
      options={autocompleteProps?.options ?? []}
      getOptionLabel={(option) => option.label}
      onChange={(_, value) =>
        field.onChange(config?.manageWithLabel ? value?.label : value)
      }
      onBlur={field.onBlur}
      renderInput={(params) => (
        <TextField
          // Attention to ther order of parameters passing
          {...textFieldProps}
          {...params}
          inputRef={field.ref}
          name={field.name}
          value={field.value}
          error={!!fieldState.error}
          helperText={config?.displayErrorMessage && fieldState.error?.message}
        />
      )}
    />
  );
};
