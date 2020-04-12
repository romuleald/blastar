import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from '@chakra-ui/core';
import {Formik, Field} from 'formik';
import {getRoomId} from '../selectors/gameSelectors';
import {getIsPseudoAvailableSelector} from '../selectors/room.selectors';
import {isPseudoAvailable as isPseudoAvailableAction} from '../actionCreators/roomActionCreators';

const _CreateRoomForm = ({userHasStoppedTyping, isPseudoAvailable}) => {
    const [timeOutId, setTimeoutId] = useState(0);
    const [pseudoInputValue, setPseudoInputValue] = useState('');

    const validateName = value => {
        let error;
        if (!value) {
            error = 'Name is required';
        }
        return error;
    };

    const onChange = values => {
        const inputValue = values.target.value;
        setPseudoInputValue(inputValue);
        timeOutId && window.clearTimeout(timeOutId);
        const id = window.setTimeout(() => {
            setTimeoutId(id);
            inputValue && userHasStoppedTyping(inputValue);
        }, 2000);
    };

    const isButtonDisabled = () => isPseudoAvailable && pseudoInputValue.length >= 3;

    const onSubmit = values => {
        console.log(values);
    };
    console.log(isPseudoAvailable && pseudoInputValue.length >= 3);
    return (
        <Formik initialValues={{pseudo: ''}} onSubmit={values => onSubmit(values)}>
            {props => (
                <form onSubmit={props.handleSubmit}>
                    <Field name="pseudo" validate={validateName}>
                        {({field, form}) => (
                            <FormControl paddingBottom={6} isInvalid={form.errors.name && form.touched.name}>
                                <FormLabel color="black" htmlFor="pseudo">
                                    Pseudo
                                </FormLabel>
                                <Input
                                    {...field}
                                    onChange={onChange}
                                    color="black"
                                    id="pseudo"
                                    placeholder="Votre pseudo"
                                    value={pseudoInputValue}
                                    mb="10px"
                                />
                                {!isPseudoAvailable && pseudoInputValue.length >= 3 ? (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertTitle color="black" mr={2}>
                                            Pseudo non disponible
                                        </AlertTitle>
                                        <AlertDescription color="black">Essayez un autre pseudo</AlertDescription>
                                    </Alert>
                                ) : null}
                                ;<FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Button
                        mt={4}
                        variantColor="teal"
                        isLoading={props.isSubmitting}
                        type="submit"
                        isDisabled={!isButtonDisabled()}>
                        Générer une room
                    </Button>
                </form>
            )}
        </Formik>
    );
};

const mapStateToProps = state => ({
    roomId: getRoomId(state),
    isPseudoAvailable: getIsPseudoAvailableSelector(state)
});

const mapDispatchToProps = dispatch => ({
    userHasStoppedTyping: (pseudo: string) => dispatch(isPseudoAvailableAction(pseudo))
});

export const CreateRoomForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(_CreateRoomForm);
