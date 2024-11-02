/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2 as Grid,
  Typography
} from '@mui/material';
import { useCallback } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import { top100Films } from '../dummy-data/top100Films';

import { MuiAutocomplete } from './components/MuiAutocomplete';
import { MuiCheckbox } from './components/MuiCheckbox';
import { isValidDate, MuiDatePicker } from './components/MuiDatePicker';
import { MuiNumericField } from './components/MuiNumericField';
import { MuiSelect } from './components/MuiSelect';
import { MuiTextField } from './components/MuiTextField';

type FormData = {
  name: string;
  assets: number | null;
  film: string;
  birthday: string;
  menu: string;
  check: boolean;
};

const MaterialForm = () => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: '',
      assets: null,
      film: '',
      birthday: '',
      menu: '',
      check: false
    },
    // onSubmit modeの場合、formStateのisValidは適切な値とならないことに注意
    mode: 'onSubmit'
  });

  const onSubmit = useCallback((data: FormData) => {
    console.log('✅Submitted', data);
  }, []);

  const onError = useCallback((errors: FieldErrors<FormData>) => {
    console.log('❌Error', errors);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                サンプルフォーム
              </Typography>
              <Typography gutterBottom variant='body1' component='div'>
                「送信」ボタンを押すとフォームオブジェクトがconsoleに出力されます。
              </Typography>
              <Grid container spacing={2}>
                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                    lg: 4
                  }}
                >
                  <MuiTextField<FormData>
                    name='name'
                    control={control}
                    rules={{
                      required: '必須項目です。',
                      maxLength: {
                        value: 5,
                        message: '5文字以内で入力してください。'
                      }
                    }}
                    config={{
                      displayErrorMessage: true
                    }}
                    muiProps={{
                      textFieldProps: {
                        label: '名前',
                        fullWidth: true
                      }
                    }}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                    lg: 4
                  }}
                >
                  <MuiNumericField<FormData>
                    name='assets'
                    control={control}
                    rules={{
                      required: '必須項目です。',
                      max: {
                        value: 100000,
                        message: '100,000以下の数値を入力してください。'
                      }
                    }}
                    config={{
                      displayErrorMessage: true,
                      thousandSeparator: true,
                      prefix: '¥'
                    }}
                    muiProps={{
                      textFieldProps: {
                        label: '貯蓄額',
                        fullWidth: true
                      }
                    }}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                    lg: 4
                  }}
                >
                  <MuiAutocomplete<FormData>
                    name='film'
                    control={control}
                    rules={{
                      required: '必須項目です。'
                    }}
                    config={{
                      displayErrorMessage: true,
                      manageWithLabel: true
                    }}
                    muiProps={{
                      autocompleteProps: {
                        disablePortal: true,
                        options: top100Films
                      },
                      textFieldProps: {
                        label: '好きな映画'
                      }
                    }}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                    lg: 4
                  }}
                >
                  <MuiDatePicker<FormData, 'birthday'>
                    name='birthday'
                    control={control}
                    rules={{
                      required: '必須項目です。',
                      validate: (val) =>
                        isValidDate(val) ? true : '無効な日付です。'
                    }}
                    config={{
                      displayErrorMessage: true
                    }}
                    muiProps={{
                      datePickerProps: {
                        disableFuture: true,
                        label: '誕生日',
                        openTo: 'day'
                      },
                      textFieldProps: {
                        fullWidth: true
                      }
                    }}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                    lg: 4
                  }}
                >
                  <MuiSelect<FormData, 'menu'>
                    name='menu'
                    control={control}
                    rules={{
                      required: '必須項目です。'
                    }}
                    config={{
                      displayErrorMessage: true,
                      options: [
                        {
                          label: 'Beef',
                          value: 0
                        },
                        {
                          label: 'Pork',
                          value: 1
                        },
                        {
                          label: 'Chicken',
                          value: 2
                        }
                      ]
                    }}
                    muiProps={{
                      selectProps: {
                        label: 'メニュー',
                        fullWidth: true
                      }
                    }}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                    lg: 4
                  }}
                  display='flex'
                  alignItems='center'
                >
                  <MuiCheckbox<FormData, 'check'>
                    name='check'
                    control={control}
                    rules={{
                      required: '必須項目です。'
                    }}
                    config={{
                      displayErrorMessage: true,
                      label: 'チェックボックス'
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button variant='contained' type='submit'>
                送信
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MaterialForm;
