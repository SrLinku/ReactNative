// importa react e o hook useState para controle de estado
import React, { use, useState } from 'react';

// importa os componentes nativos para construção de interface
import {
    View, // container de layout
    TextInput, // campo de entrada de texto
    Text, // exibicao de texto
    TouchableOpacity, // botao personalizavel
    FlatList, // lista de rolagem eficiente 
    StyleSheet, // estilização
    Alert // exibição de alertas
} from 'react-native';

//componente principal da aplicação
export default function HomeScreen() {
    // estado para os campos do formulario
    const [descricao, setDescricao] = useState(''); // descrição do gasto
    const [valor, setValor] = useState(''); // valor do gasto
    const [gastos, setGastos] = useState([]); //lista de gastos
    const [editandoId, setEditandoId] = useState(null); // id do item sendo editado

    // função para adicionar um novo gasto ou atualizar um existente
    const adicionarOuAtualizarGasto = () => {
        // validacao campo nao podem estar vazios
        if (!descricao || !valor) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        //Validação para verificar valor numerico no campo valor
        if (isNaN(parseFloat(valor))) {
            Alert.alert('Erro', 'Valor deve ser um número');
            return;
        }

        if (editandoId) {
            // Atualiza o gasto existente com base no ID
            const gastosAtualizados = gastos.map(item =>
                item.id === editandoId ? { ...item, descricao, valor: parseFloat(valor).toFixed(2) } : item
            );
            setGastos(gastosAtualizados);
            setEditandoId(null); // Limpa o estado de edição após atualizar
        } else {
            // Adiciona um novo gasto
            const novoGasto = {
                id: Date.now().toString(), // Gera um ID único baseado no timestamp
                descricao,
                valor: parseFloat(valor)
            };
            setGastos([...gastos, novoGasto]);
        }
    }
}