import { transition, trigger, query, style, animate, group, animateChild } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
	transition('Home <=> *', [
		query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
		group([
			query(
				':enter',
				[
					style({ filter: 'blur(2.5em)', opacity: '0' }),
					animate('0.75s ease-in-out', style({ filter: 'blur(0)', opacity: '1' }))
				],
				{ optional: true }
			),
			query(
				':leave',
				[
					style({ filter: 'blur(0)', opacity: '1' }),
					animate('0.75s ease-in-out', style({ filter: 'blur(2.5em)', opacity: '0' }))
				],
				{ optional: true }
			)
		])
	]),
	transition('About <=> *', [
		query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
		group([
			query(
				':enter',
				[
					style({ filter: 'blur(2.5em)', opacity: '0' }),
					animate('0.75s ease-in-out', style({ filter: 'blur(0)', opacity: '1' }))
				],
				{ optional: true }
			),
			query(
				':leave',
				[
					style({ filter: 'blur(0)', opacity: '1' }),
					animate('0.75s ease-in-out', style({ filter: 'blur(2.5em)', opacity: '0' }))
				],
				{ optional: true }
			)
		])
	]),
	transition('Gallery <=> *', [
		query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
		group([
			query(
				':enter',
				[
					style({ filter: 'blur(2.5em)', opacity: '0' }),
					animate('0.75s ease-in-out', style({ filter: 'blur(0)', opacity: '1' }))
				],
				{ optional: true }
			),
			query(
				':leave',
				[
					style({ filter: 'blur(0)', opacity: '1' }),
					animate('0.75s ease-in-out', style({ filter: 'blur(2.5em)', opacity: '0' }))
				],
				{ optional: true }
			)
		])
	]),
	transition('Ytbl <=> *', [
		query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
		group([
			query(
				':enter',
				[
					style({ filter: 'blur(2.5em)', opacity: '0' }),
					animate('0.75s ease-in-out', style({ filter: 'blur(0)', opacity: '1' }))
				],
				{ optional: true }
			),
			query(
				':leave',
				[
					style({ filter: 'blur(0)', opacity: '1' }),
					animate('0.75s ease-in-out', style({ filter: 'blur(2.5em)', opacity: '0' }))
				],
				{ optional: true }
			)
		])
	])
]);
