import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { configSchema } from './config-schema';
import { dashboardMeta } from './dashboard.meta';
import proceduresOverviewComponent from './procedures/procedures-overview.component';
import proceduresDetailedSummaryComponent from './procedures/procedures-detailed-summary.component';
import proceduresHistorySummaryComponent from './procedures/procedures-history-dashboard.component';

const moduleName = '@openmrs/esm-patient-procedures-app';

const options = {
  featureName: 'patient-procedures',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const proceduresOverview = getSyncLifecycle(proceduresOverviewComponent, options);

export const proceduresDetailedSummary = getSyncLifecycle(proceduresDetailedSummaryComponent, options);

// export const procedureHistorySummary = getSyncLifecycle(proceduresHistorySummaryComponent, options);

export const proceduresFormWorkspace = getAsyncLifecycle(
  () => import('./procedures/procedures-form.workspace'),
  options,
);

export const proceduresDashboardLink = getSyncLifecycle(
  createDashboardLink({
    ...dashboardMeta,
  }),
  options,
);
