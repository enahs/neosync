// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.20.0
// source: copyfrom.go

package db_queries

import (
	"context"
)

// iteratorForCreateJobConnectionDestinations implements pgx.CopyFromSource.
type iteratorForCreateJobConnectionDestinations struct {
	rows                 []CreateJobConnectionDestinationsParams
	skippedFirstNextCall bool
}

func (r *iteratorForCreateJobConnectionDestinations) Next() bool {
	if len(r.rows) == 0 {
		return false
	}
	if !r.skippedFirstNextCall {
		r.skippedFirstNextCall = true
		return true
	}
	r.rows = r.rows[1:]
	return len(r.rows) > 0
}

func (r iteratorForCreateJobConnectionDestinations) Values() ([]interface{}, error) {
	return []interface{}{
		r.rows[0].JobID,
		r.rows[0].ConnectionID,
		r.rows[0].Options,
	}, nil
}

func (r iteratorForCreateJobConnectionDestinations) Err() error {
	return nil
}

func (q *Queries) CreateJobConnectionDestinations(ctx context.Context, arg []CreateJobConnectionDestinationsParams) (int64, error) {
	return q.db.CopyFrom(ctx, []string{"neosync_api", "job_destination_connection_associations"}, []string{"job_id", "connection_id", "options"}, &iteratorForCreateJobConnectionDestinations{rows: arg})
}
