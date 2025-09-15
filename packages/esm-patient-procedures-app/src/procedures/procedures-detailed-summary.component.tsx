import { launchWorkspace, useVisit } from '@openmrs/esm-framework';
import { EmptyState } from '@openmrs/esm-patient-common-lib';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface ProceduresDetailedSummaryProps {
  patientUuid: string;
}

const ProceduresDetailedSummary: React.FC<ProceduresDetailedSummaryProps> = ({ patientUuid }) => {
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

export default ProceduresDetailedSummary;
