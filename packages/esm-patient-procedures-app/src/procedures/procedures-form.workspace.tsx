import { ResponsiveWrapper, useLayoutType } from '@openmrs/esm-framework';
import { type DefaultPatientWorkspaceProps } from '@openmrs/esm-patient-common-lib';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type Procedure } from './procedures.resource';
import {
  Button,
  ButtonSet,
  Form,
  FormGroup,
  FormLabel,
  InlineLoading,
  InlineNotification,
  Search,
  Stack,
} from '@carbon/react';
import styles from './procedures-form.scss';
import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import { type TFunction } from 'i18next';
import { z } from 'zod';

interface ProceduresFormProps extends DefaultPatientWorkspaceProps {
  procedure?: Procedure;
  formContext: 'creating' | 'editing';
}

interface RequiredFieldLabelProps {
  label: string;
  t: TFunction;
}

const createSchema = (formContext: 'creating' | 'editing', t: TFunction) => {
  const isCreating = formContext === 'creating';

  const clinicalStatusValidation = z.string().refine((clinicalStatus) => !isCreating || !!clinicalStatus, {
    message: t('clinicalStatusRequired', 'A clinical status is required'),
  });

  const conditionNameValidation = z.string().refine((conditionName) => !isCreating || !!conditionName, {
    message: t('conditionRequired', 'A condition is required'),
  });

  return z.object({
    abatementDateTime: z.date().optional().nullable(),
    clinicalStatus: clinicalStatusValidation,
    conditionName: conditionNameValidation,
    onsetDateTime: z
      .date()
      .nullable()
      .refine((onsetDateTime) => onsetDateTime <= new Date(), {
        message: t('onsetDateCannotBeInTheFuture', 'Onset date cannot be in the future'),
      }),
  });
};

export type ProceduresFormSchema = z.infer<ReturnType<typeof createSchema>>;

const ProceduresForm: React.FC<ProceduresFormProps> = ({
  patientUuid,
  closeWorkspace,
  closeWorkspaceWithSavedChanges,
  formContext,
}) => {
  const isTablet = useLayoutType() === 'tablet';
  const { t } = useTranslation();
  const isEditing = formContext === 'editing';
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [errorCreating, setErrorCreating] = useState(null);
  const [errorUpdating, setErrorUpdating] = useState(null);
  const displayName = '';

  const {
    control,
    formState: { errors },
    getValues,
    watch,
  } = useFormContext<ProceduresFormSchema>();

  return (
    <Form>
      <div>
        <Stack gap={7}>
          <FormGroup legendText={<RequiredFieldLabel label={t('condition', 'Condition')} t={t} />}>
            {' '}
            {isEditing ? <FormLabel className={styles.conditionLabel}>{displayName}</FormLabel> : <></>}
          </FormGroup>
        </Stack>
        {errorCreating ? (
          <div className={styles.errorContainer}>
            <InlineNotification
              className={styles.error}
              role="alert"
              kind="error"
              lowContrast
              title={t('errorCreatingCondition', 'Error creating condition')}
              subtitle={errorCreating?.message}
            />
          </div>
        ) : null}
        {errorUpdating ? (
          <div className={styles.errorContainer}>
            <InlineNotification
              className={styles.error}
              role="alert"
              kind="error"
              lowContrast
              title={t('errorUpdatingCondition', 'Error updating condition')}
              subtitle={errorUpdating?.message}
            />
          </div>
        ) : null}
        <ButtonSet className={classNames({ [styles.tablet]: isTablet, [styles.desktop]: !isTablet })}>
          <Button className={styles.button} kind="secondary" onClick={() => closeWorkspace()}>
            Cancel
          </Button>
          <Button className={styles.button} disabled={isSubmittingForm} kind="primary" type="submit">
            {isSubmittingForm ? (
              <InlineLoading className={styles.spinner} description={t('saving', 'Saving') + '...'} />
            ) : (
              <span>Save and Close</span>
            )}
          </Button>
        </ButtonSet>
      </div>
    </Form>
  );
};

export default ProceduresForm;

function RequiredFieldLabel({ label, t }: RequiredFieldLabelProps) {
  return (
    <span>
      {label}
      <span title={t('required', 'Required')} className={styles.required}>
        *
      </span>
    </span>
  );
}
