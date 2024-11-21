import { ChangeEvent, useState } from 'react';

export const useInputForm = <T>(initialValue: T) => {
	const [inputData, setInputData] = useState<T>(initialValue);

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputData((previous) => ({
			...previous,
			[event.target.name]: event.target.value,
		}));
	};

	const onReset = () => {
		setInputData(initialValue);
	};

	const isEmpty = (value: string) => {
		return value.trim().length > 0 ? false : true;
	};

	const isValidEmail = (email: string) => {
		const emailPattern =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return emailPattern.test(email);
	};

	return {
		...inputData,

		// Properties
		data: inputData,
		// setErrorMessageId( key: unknown, value?: unknown ) {
		//     if( typeof key === 'string' ) {
		//         setInputData( ( previous ) => {
		//             return {
		//                 ...previous,
		//                 [`${key}_ErrorId`]: value
		//             };
		//         });
		//     }
		// },
		// setStatus( key: unknown, value?: unknown ) {
		//     if( typeof key === 'string' ) {
		//         setInputData( ( previous ) => {
		//             return {
		//                 ...previous,
		//                 [`${key}_Status`]: value
		//             };
		//         });
		//     }
		// },
		setValue(key: unknown, value?: unknown) {
			if (typeof key === 'string') {
				setInputData((previous) => {
					return {
						...previous,
						[`${key}`]: value,
					};
				});
			}
		},

		// Methods
		onInputChange: onInputChange,
		onReset: onReset,
		isEmpty,
		isValidEmail: isValidEmail,
	};
};
