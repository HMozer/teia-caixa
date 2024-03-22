import 
{ 
    Container,
    Row,
    Col,
    Pagination,
    Form 
} from 'react-bootstrap';

import {Table as RTable} from '@tanstack/react-table'
import { TAlbum } from '../types/TAlbum';

const TabPaginacao = (tabela: RTable<TAlbum>) =>
{
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <Pagination>
                        <Pagination.First
                        className="mr-5"
                        onClick={() => tabela.firstPage()}
                        disabled={!tabela.getCanPreviousPage()}/>
                        <Pagination.Prev 
                        onClick={() => tabela.previousPage()}
                        disabled={!tabela.getCanPreviousPage()}/>
                        <span className="texto-paginacao">
                            <div>
                            Página
                            <strong>
                                {tabela.getState().pagination.pageIndex + 1} de{' '}
                                {tabela.getPageCount().toLocaleString()}
                            </strong>
                            </div>
                        </span>
                        <Pagination.Next
                        className="mr-5"
                        onClick={() => tabela.nextPage()}
                        disabled={!tabela.getCanNextPage()}/>
                        <Pagination.Last 
                        onClick={() => tabela.lastPage()}
                        disabled={!tabela.getCanNextPage()}/>
                    </Pagination>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <span className="mr-5">
                        Exibindo {' '} {tabela.getRowModel().rows.length.toLocaleString()}
                        {' '} de {' '} {tabela.getRowCount().toLocaleString()} linhas
                    </span>
                    <Form.Select 
                        size="sm"
                        className="w-25 d-inline"
                        aria-label="select"
                        value={tabela.getState().pagination.pageSize}
                        onChange={e => tabela.setPageSize(Number(e.target.value))}>
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}> Mostrar {pageSize} </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
        </Container>
    );
}

export default TabPaginacao;