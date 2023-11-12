<script lang="ts">
	const connect = async () => {
		const device = await navigator.bluetooth.requestDevice({
			filters: [{ services: ['heart_rate'], namePrefix: 'Polar' }]
		});

		const server = await device.gatt?.connect();
		const service = await server?.getPrimaryService('heart_rate');

		const characteristic = await service?.getCharacteristic('heart_rate_measurement');

		console.log(characteristic);

		const notificationsCharacteristic = await characteristic?.startNotifications();

		console.log('Notifications started');
		console.log(notificationsCharacteristic);

		notificationsCharacteristic!.oncharacteristicvaluechanged = (event) => {
			console.log('Event fired');
			console.log(event);
		};

		console.log('Event listener added');
		console.log(notificationsCharacteristic);
	};
</script>

<button on:click={connect}>Connect</button>
