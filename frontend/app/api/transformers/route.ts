import { withNeosyncContext } from '@/api-only/neosync-context';
import { GetSystemTransformersRequest } from '@/neosync-api-client/mgmt/v1alpha1/transformer_pb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  return withNeosyncContext(async (ctx) => {
    return ctx.transformerClient.getSystemTransformers(
      new GetSystemTransformersRequest({})
    );
  })(req);
}
