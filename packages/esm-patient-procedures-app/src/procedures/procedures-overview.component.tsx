import { launchWorkspace } from '@openmrs/esm-framework';
import { EmptyState } from '@openmrs/esm-patient-common-lib';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export interface ProceduresOverviewProps {
  basePath: string;
  patient: fhir.Patient;
  patientUuid: string;
}

const ProceduresOverview: React.FC<ProceduresOverviewProps> = ({ patient, patientUuid, basePath }) => {
  const { t } = useTranslation();
  const displayText = t('procedures__lower', 'procedures');
  const headerTitle = t('procedures', 'Procedures');

  const launchProceduresForm = useCallback(
    () =>
      launchWorkspace('procedures-form-workspace', {
        formContext: 'creating',
      }),
    [],
  );

  return <EmptyState displayText={displayText} headerTitle={headerTitle} launchForm={launchProceduresForm} />;
};

export default ProceduresOverview;
