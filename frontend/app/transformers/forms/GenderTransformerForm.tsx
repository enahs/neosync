'use client';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { Switch } from '@/components/ui/switch';
import { ReactElement, useState } from 'react';
import { useFormContext } from 'react-hook-form';
interface Props {
  index?: number;
  setIsSheetOpen?: (val: boolean) => void;
}

export default function GenderTransformerForm(props: Props): ReactElement {
  const { index, setIsSheetOpen } = props;

  const fc = useFormContext();

  const vals = fc.getValues();

  //sheet re-renders on every open which resets state, so have to get the values from the mappings so user values persist across sheet openings
  const [ab, setAb] = useState<boolean>(
    vals.mappings[index ?? 0].transformer.config.abbreviate
  );

  const handleSubmit = () => {
    fc.setValue(`mappings.${index}.transformer.config.abbreviate`, ab, {
      shouldValidate: false,
    });
    setIsSheetOpen!(false);
  };

  return (
    <div className="flex flex-col w-full space-y-4 pt-4">
      <FormField
        name={`mappings.${index}.transformer.config.abbreviate`}
        defaultValue={ab}
        render={() => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Abbreviate</FormLabel>
              <FormDescription>
                Abbreviate the gender to a single character. For example, female
                would be returned as f.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={ab}
                onCheckedChange={() => {
                  ab ? setAb(false) : setAb(true);
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex justify-end">
        <Button type="button" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
}
