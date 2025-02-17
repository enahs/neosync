'use client';
import { PageProps } from '@/components/types';

import ButtonText from '@/components/ButtonText';
import Spinner from '@/components/Spinner';
import OverviewContainer from '@/components/containers/OverviewContainer';
import PageHeader from '@/components/headers/PageHeader';
import SkeletonTable from '@/components/skeleton/SkeletonTable';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { refreshWhenJobRunning, useGetJobRun } from '@/libs/hooks/useGetJobRun';
import {
  getRefreshEventsWhenJobRunningFn,
  useGetJobRunEvents,
} from '@/libs/hooks/useGetJobRunEvents';
import { formatDateTime } from '@/util/util';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import JobRunStatus from '../components/JobRunStatus';
import JobRunActivityTable from './components/JobRunActivityTable';

export default function Page({ params }: PageProps): ReactElement {
  const id = params?.id ?? '';
  const { data, isLoading } = useGetJobRun(id, {
    refreshIntervalFn: refreshWhenJobRunning,
  });

  const {
    data: eventData,
    isLoading: eventsIsLoading,
    isValidating,
  } = useGetJobRunEvents(id, {
    refreshIntervalFn: getRefreshEventsWhenJobRunningFn(data?.jobRun?.status),
  });

  const jobRun = data?.jobRun;

  return (
    <OverviewContainer
      Header={
        <PageHeader
          header="Job Run Details"
          description={jobRun?.id || ''}
          extraHeading={<ButtonLink jobId={jobRun?.jobId} />}
        />
      }
      containerClassName="runs-page"
    >
      {isLoading ? (
        <div className="space-y-24">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}
          >
            <Skeleton className="w-full h-24 rounded-lg" />
            <Skeleton className="w-full h-24 rounded-lg" />
            <Skeleton className="w-full h-24 rounded-lg" />
            <Skeleton className="w-full h-24 rounded-lg" />
          </div>

          <SkeletonTable />
        </div>
      ) : (
        <div className="space-y-12">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}
          >
            <StatCard
              header="Status"
              content={
                <JobRunStatus status={jobRun?.status} className="text-lg" />
              }
            />
            <StatCard
              header="Start Time"
              content={formatDateTime(jobRun?.startedAt?.toDate())}
            />
            <StatCard
              header="Completion Time"
              content={formatDateTime(jobRun?.completedAt?.toDate())}
            />
            <StatCard
              header="Duration"
              content={getDuration(
                jobRun?.completedAt?.toDate(),
                jobRun?.startedAt?.toDate()
              )}
            />
          </div>
          <div className="space-y-4">
            {jobRun?.pendingActivities.map((a) => {
              if (a.lastFailure) {
                return (
                  <AlertDestructive
                    key={a.activityName}
                    title={a.activityName}
                    description={a.lastFailure?.message || ''}
                  />
                );
              }
            })}
          </div>
          <div className="space-y-4">
            <div className="flex flex-row items-center space-x-2">
              <h1 className="text-2xl font-bold tracking-tight">Activity</h1>
              {isValidating && <Spinner />}
            </div>
            {eventsIsLoading ? (
              <SkeletonTable />
            ) : (
              <JobRunActivityTable jobRunEvents={eventData?.events || []} />
            )}
          </div>
        </div>
      )}
    </OverviewContainer>
  );
}

interface StatCardProps {
  header: string;
  content?: JSX.Element | string;
}

function StatCard(props: StatCardProps): ReactElement {
  const { header, content } = props;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{header}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold">{content}</div>
      </CardContent>
    </Card>
  );
}

function getDuration(dateTimeValue2?: Date, dateTimeValue1?: Date): string {
  if (!dateTimeValue1 || !dateTimeValue2) {
    return '';
  }
  var differenceValue =
    (dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
  const minutes = Math.abs(Math.round(differenceValue / 60));
  const seconds = Math.round(differenceValue % 60);
  if (minutes == 0) {
    return `${seconds} seconds`;
  }
  return `${minutes} minutes ${seconds} seconds`;
}

interface AlertProps {
  title: string;
  description: string;
}

function AlertDestructive(props: AlertProps): ReactElement {
  return (
    <Alert variant="destructive">
      <AlertTitle>{`${props.title}: ${props.description}`}</AlertTitle>
    </Alert>
  );
}

interface ButtonProps {
  jobId?: string;
}

function ButtonLink(props: ButtonProps): ReactElement {
  const router = useRouter();
  if (!props.jobId) {
    return <></>;
  }
  return (
    <Button
      variant="outline"
      onClick={() => router.push(`/jobs/${props.jobId}`)}
    >
      <ButtonText
        text="View Job"
        rightIcon={<ArrowRightIcon className="ml-2 h-4 w-4" />}
      />
    </Button>
  );
}
