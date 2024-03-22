import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import React, { useEffect } from 'react';
import http from './http/http';
import { TAlbum } from './types/TAlbum';
import TabPaginacao from './components/TabPaginacao';

import
{ 
  ColumnFiltersState,
    PaginationState,
    SortingState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable 
} from '@tanstack/react-table';
import
{ 
    Col,
    Container,
    Row,
    Table as BTable
} from 'react-bootstrap';
import Titulo from './components/Titulo';
import Fundo from './components/Fundo';


/* Monta organização e estrutura das colunas */
const columnHelper = createColumnHelper<TAlbum>()
const columns = [
  columnHelper.accessor('thumbnailUrl', {
    header: () => <strong>Capa do álbum</strong>,
    cell: info => <img className="limita-imagem" src={info.getValue()} alt={info.row.original.title} />,
    footer: info => info.column.id,
    enableSorting: false
  }),
  columnHelper.accessor('title', {
    header: () => <strong>Nome do álbum</strong>,
    cell: info => info.getValue(),
    footer: info => info.column.id,
    enableSorting: true, //habilita organizar
  })
];

function App()
{
  /*Define formato de recebimento de dados*/
  const [data, _setData] = React.useState<TAlbum[]>([])

  /*Busca dados na api*/
  useEffect(() =>
  {
      http.get<TAlbum[]>('/')
          .then(response => _setData(response.data))
          .catch(error => console.log(error));
  }, []);

  /* Define paginação */
  const [pagination, _setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  /* Define organização */
  const [sorting, _setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: _setPagination,
    onSortingChange: _setSorting,
    state: {
      pagination,
      sorting
    },
  });

  return (
    <>
      <Titulo />

      <Container>
        <Row>
          <Col>
            <BTable striped bordered hover>
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                      return(
                        <th key={header.id}>
                          {header.isPlaceholder ? null : (
                            <div
                              className={header.column.getCanSort() ? 'cursor-pointer select-none text-under' : ''}
                              onClick={header.column.getToggleSortingHandler()}
                              title=
                              {
                                header.column.getCanSort() ?
                                  header.column.getNextSortingOrder() === 'asc' ? 
                                  'Crescente'
                                  : header.column.getNextSortingOrder() === 'desc' ?
                                    'Decrescente'
                                    :'Limpar'
                                : undefined}>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext())}
                                {{
                                  asc: ' 🔼',
                                  desc: ' 🔽',
                                }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </BTable>
          </Col>
        </Row>
        <TabPaginacao {...table} />
      </Container>

      <Fundo />
    </>
  );
}

export default App;