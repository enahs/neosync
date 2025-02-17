import EditTransformerOptions from '@/app/transformers/EditTransformerOptions';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { cn } from '@/libs/utils';
import { Transformer } from '@/neosync-api-client/mgmt/v1alpha1/transformer_pb';
import { UpdateIcon } from '@radix-ui/react-icons';
import memoize from 'memoize-one';
import {
  CSSProperties,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List, areEqual } from 'react-window';
import { VirtualizedTree } from '../../VirtualizedTree';
import ColumnFilterSelect from './ColumnFilterSelect';
import TransformerSelect from './TransformerSelect';

interface Row {
  table: string;
  transformer: {
    value: string;
    config: {};
  };
  schema: string;
  column: string;
  dataType: string;
  isSelected: boolean;
}

type ColumnFilters = Record<string, string[]>;

interface VirtualizedSchemaTableProps {
  data: Row[];
  transformers?: Transformer[];
}

export const VirtualizedSchemaTable = memo(function VirtualizedSchemaTable({
  data,
  transformers,
}: VirtualizedSchemaTableProps) {
  const [rows, setRows] = useState(data);
  const [transformer, setTransformer] = useState<string>('');
  const [bulkSelect, setBulkSelect] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({});
  const form = useFormContext();

  useEffect(() => {
    setRows(data);
  }, [data]);

  const treeData = useMemo(
    () => getSchemaTreeData(data, columnFilters),
    [data, columnFilters]
  );

  const onFilterSelect = useCallback(
    (columnId: string, colFilters: string[]) => {
      setColumnFilters((prevFilters) => {
        const newFilters = { ...prevFilters, [columnId]: colFilters };
        if (colFilters.length == 0) {
          delete newFilters[columnId as keyof ColumnFilters];
        }
        const filteredRows = data.filter((r) => shouldFilterRow(r, newFilters));
        setRows(filteredRows);
        return newFilters;
      });
    },
    []
  );

  const onSelect = useCallback((index: number) => {
    setRows((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = {
        ...newItems[index],
        isSelected: !newItems[index].isSelected,
      };
      return newItems;
    });
  }, []);

  const onSelectAll = useCallback((isSelected: boolean) => {
    setRows((prevItems) => {
      const newItems = [...prevItems];
      return newItems.map((i) => {
        return {
          ...i,
          isSelected,
        };
      });
    });
  }, []);

  const onTreeFilterSelect = useCallback((id: string, isSelected: boolean) => {
    setColumnFilters((prevFilters) => {
      const [schema, table] = id.split('.');
      const newFilters = { ...prevFilters };
      if (isSelected) {
        newFilters['schema'] = newFilters['schema']
          ? [...newFilters['schema'], schema]
          : [schema];
        if (table) {
          newFilters['table'] = newFilters['table']
            ? [...newFilters['table'], table]
            : [table];
        }
      } else {
        newFilters['schema'] = newFilters['schema'].filter((s) => s != schema);
        if (table) {
          newFilters['table'] = newFilters['table'].filter((t) => t != table);
        }
      }
      const filteredRows = data.filter((r) => shouldFilterRow(r, newFilters));
      setRows(filteredRows);
      return newFilters;
    });
  }, []);

  return (
    <div className="flex flex-row w-full">
      <div className="basis-1/6  pt-[45px] ">
        <VirtualizedTree data={treeData} onNodeSelect={onTreeFilterSelect} />
      </div>
      <div className={`space-y-2 pl-8 basis-5/6`}>
        <div className="flex items-center justify-between">
          <div className="w-[250px]">
            <TransformerSelect
              transformers={transformers || []}
              value={transformer}
              onSelect={(value) => {
                rows.forEach((r, index) => {
                  if (r.isSelected) {
                    form.setValue(
                      `mappings.${index}.transformer.value`,
                      value,
                      {
                        shouldDirty: true,
                      }
                    );
                  }
                });
                onSelectAll(false);
                setBulkSelect(false);
                setTransformer('');
              }}
              placeholder="Bulk update transformers..."
            />
          </div>
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              setColumnFilters({});
              setRows(data);
            }}
          >
            Clear filters
            <UpdateIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>

        <VirtualizedSchemaList
          rows={rows}
          allRows={data}
          onSelect={onSelect}
          onSelectAll={onSelectAll}
          transformers={transformers}
          bulkSelect={bulkSelect}
          setBulkSelect={setBulkSelect}
          columnFilters={columnFilters}
          onFilterSelect={onFilterSelect}
        />
      </div>
    </div>
  );
});

interface RowProps {
  index: number;
  style: CSSProperties;
  data: {
    rows: Row[];
    onSelect: (index: number) => void;
    onSelectAll: (value: boolean) => void;
    transformers?: Transformer[];
  };
}

// If list items are expensive to render,
// Consider using PureComponent to avoid unnecessary re-renders.
// https://reactjs.org/docs/react-api.html#reactpurecomponent
const Row = memo(function Row({ data, index, style }: RowProps) {
  // Data passed to List as "itemData" is available as props.data
  const { rows, onSelect, transformers } = data;
  const row = rows[index];

  return (
    <div style={style} className="border-t">
      <div className="grid grid-cols-5 gap-4 items-center p-2">
        <div className="flex flex-row truncate ">
          <Checkbox
            id="select"
            onClick={() => onSelect(index)}
            checked={row.isSelected}
            type="button"
            className="self-center mr-4"
          />
          <Cell value={row.schema} />
        </div>
        <Cell value={row.table} />
        <Cell value={row.column} />
        <Cell value={row.dataType} />
        <div className=" ">
          <FormField
            name={`mappings.${index}.transformer.value`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row space-x-2  ">
                    <div className="w-[175px]">
                      <TransformerSelect
                        transformers={transformers || []}
                        value={field.value}
                        onSelect={field.onChange}
                        placeholder="Search transformers..."
                        defaultValue="passthrough"
                      />
                    </div>
                    <EditTransformerOptions
                      transformer={transformers?.find(
                        (item) => item.value == field.value
                      )}
                      index={index}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}, areEqual);
Row.displayName = 'row';

interface CellProps {
  value: string;
}

function Cell(props: CellProps) {
  const { value } = props;
  return <span className="truncate font-medium text-sm">{value}</span>;
}

// This helper function memoizes incoming props,
// To avoid causing unnecessary re-renders pure Row components.
// This is only needed since we are passing multiple props with a wrapper object.
// If we were only passing a single, stable value (e.g. items),
// We could just pass the value directly.
const createRowData = memoize(
  (
    rows: Row[],
    onSelect: (index: number) => void,
    onSelectAll: (value: boolean) => void,
    transformers?: Transformer[]
  ) => ({
    rows,
    onSelect,
    onSelectAll,
    transformers,
  })
);

interface VirtualizedSchemaListProps {
  rows: Row[];
  allRows: Row[];
  onSelect: (index: number) => void;
  onSelectAll: (value: boolean) => void;
  bulkSelect: boolean;
  setBulkSelect: (value: boolean) => void;
  columnFilters: ColumnFilters;
  onFilterSelect: (columnId: string, newValues: string[]) => void;
  transformers?: Transformer[];
}
// In this example, "items" is an Array of objects to render,
// and "onSelect" is a function that updates an item's state.
function VirtualizedSchemaList({
  rows,
  allRows,
  onSelect,
  onSelectAll,
  transformers,
  bulkSelect,
  setBulkSelect,
  columnFilters,
  onFilterSelect,
}: VirtualizedSchemaListProps) {
  // Bundle additional data to list rows using the "rowData" prop.
  // It will be accessible to item renderers as props.data.
  // Memoize this data to avoid bypassing shouldComponentUpdate().
  const rowData = createRowData(rows, onSelect, onSelectAll, transformers);
  const uniqueFilters = useMemo(
    () => getUniqueFilters(allRows, columnFilters),
    [allRows, columnFilters]
  );

  return (
    <div className={cn(`grid grid-col-1 border rounded-md`)}>
      <div className={`grid grid-cols-5 gap-2 pl-2 pt-1 pb-1 bg-muted`}>
        <div className="flex flex-row">
          <Checkbox
            id="select"
            onClick={() => {
              onSelectAll(!bulkSelect);
              setBulkSelect(!bulkSelect);
            }}
            checked={bulkSelect}
            type="button"
            className="self-center mr-4"
          />

          <span className="text-xs self-center">Schema</span>
          <ColumnFilterSelect
            columnId="schema"
            allColumnFilters={columnFilters}
            setColumnFilters={onFilterSelect}
            possibleFilters={uniqueFilters.schema}
          />
        </div>
        <div className="flex flex-row">
          <span className="text-xs self-center">Table</span>
          <ColumnFilterSelect
            columnId="table"
            allColumnFilters={columnFilters}
            setColumnFilters={onFilterSelect}
            possibleFilters={uniqueFilters.table}
          />
        </div>
        <div className="flex flex-row">
          <span className="text-xs self-center">Column</span>
          <ColumnFilterSelect
            columnId="column"
            allColumnFilters={columnFilters}
            setColumnFilters={onFilterSelect}
            possibleFilters={uniqueFilters.column}
          />
        </div>
        <div className="flex flex-row">
          <span className="text-xs self-center">Data Type</span>
          <ColumnFilterSelect
            columnId="dataType"
            allColumnFilters={columnFilters}
            setColumnFilters={onFilterSelect}
            possibleFilters={uniqueFilters.dataType}
          />
        </div>
        <div className="flex flex-row">
          <span className="text-xs self-center">Transformer</span>
          <ColumnFilterSelect
            columnId="transformer"
            allColumnFilters={columnFilters}
            setColumnFilters={onFilterSelect}
            possibleFilters={uniqueFilters.transformer}
          />
        </div>
        <div className="col-span-5"></div>
      </div>
      <div className="h-[700px]">
        <AutoSizer defaultHeight={700}>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={rows.length}
              itemData={rowData}
              itemSize={50}
              width={width}
              itemKey={(index: number) => {
                const r = rows[index];
                return `${r.schema}-${r.table}-${r.column}`;
              }}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

function shouldFilterRow(
  row: Row,
  columnFilters: ColumnFilters,
  columnId?: string
): boolean {
  for (const key of Object.keys(columnFilters)) {
    if (columnId && key == columnId) {
      continue;
    }
    const filters = columnFilters[key as keyof ColumnFilters];
    if (filters.length == 0) {
      continue;
    }
    const value =
      key == 'transformer'
        ? (row[key as 'transformer'].value as string)
        : (row[key as keyof Row] as string);

    if (!filters.includes(value)) {
      return false;
    }
  }
  return true;
}

function isTableSelected(
  table: string,
  schema: string,
  tableFilters: Set<string>,
  schemaFilters: Set<string>
): boolean {
  return (
    (schemaFilters.size === 0 || schemaFilters.has(schema)) &&
    (tableFilters.size === 0 || tableFilters.has(table))
  );
}

function getSchemaTreeData(data: Row[], columnFilters: ColumnFilters) {
  const schemaMap: Record<string, Record<string, string>> = {};
  data.forEach((row) => {
    if (!schemaMap[row.schema]) {
      schemaMap[row.schema] = { [row.table]: row.table };
    } else {
      schemaMap[row.schema][row.table] = row.table;
    }
  });

  const schemaFilters = new Set(columnFilters['schema'] || []);
  const tableFilters = new Set(columnFilters['table'] || []);

  var falseOverride = false;
  if (schemaFilters.size == 0 && tableFilters.size == 0) {
    falseOverride = true;
  }

  return Object.keys(schemaMap).map((schema) => {
    const isSchemaSelected = schemaFilters.has(schema);
    const children = Object.keys(schemaMap[schema]).map((table) => {
      return {
        id: `${schema}.${table}`,
        name: table,
        isSelected: falseOverride
          ? false
          : isTableSelected(table, schema, tableFilters, schemaFilters),
      };
    });
    const isSomeTablesSelected = children.some((t) => t.isSelected);

    return {
      id: schema,
      name: schema,
      isSelected: falseOverride
        ? false
        : isSchemaSelected || isSomeTablesSelected,
      children,
    };
  });
}

function getUniqueFiltersByColumn(
  rows: Row[],
  columnFilters: ColumnFilters,
  columnId: string
): string[] {
  const uniqueColFilters: Record<string, string> = {};
  const filteredRows = rows.filter((r) =>
    shouldFilterRow(r, columnFilters, columnId)
  );
  filteredRows.forEach((r) => {
    const value =
      columnId == 'transformer'
        ? (r[columnId as 'transformer'].value as string)
        : (r[columnId as keyof Row] as string);
    uniqueColFilters[value] = value;
  });

  return Object.keys(uniqueColFilters).sort();
}

function getUniqueFilters(
  rows: Row[],
  columnFilters: ColumnFilters
): Record<string, string[]> {
  const filterSet: Record<string, string[]> = {
    schema: getUniqueFiltersByColumn(rows, columnFilters, 'schema'),
    table: getUniqueFiltersByColumn(rows, columnFilters, 'table'),
    column: getUniqueFiltersByColumn(rows, columnFilters, 'column'),
    dataType: getUniqueFiltersByColumn(rows, columnFilters, 'dataType'),
    transformer: getUniqueFiltersByColumn(rows, columnFilters, 'transformer'),
  };
  return filterSet;
}
