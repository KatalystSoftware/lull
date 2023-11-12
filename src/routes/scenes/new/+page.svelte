<main class="space-y-12">
	<h2 class="text-2xl font-medium text-center">How are you feeling?</h2>
	<ul class="text-center font-medium text-lg space-y-4">
		<li>
			<a
				href="/camera/scene?demo=true&debug=true"
				class="hover:bg-white/70 rounded-lg bg-white/40 backdrop-blur-lg px-8 py-6"
			>
				<p>Anxious</p>
				<p class="text-sm italic">Simulated data (recommended)</p>
			</a>
		</li>
		<li>
			<a
				href="/camera/scene"
				class="hover:bg-white/70 rounded-lg bg-white/40 backdrop-blur-lg px-8 py-6"
			>
				<p>Stressed</p>
				<p class="text-sm italic">Live BPM camera (experimental)</p></a
			>
		</li>
		<li>
			<a
				href="/camera/scene?debug=true"
				class="hover:bg-white/70 rounded-lg bg-white/40 backdrop-blur-lg px-8 py-6"
			>
				<p>Headache</p>
				<p class="text-sm italic">Live with debug information</p></a
			>
		</li>
	</ul>
</main>

<style>
	li a {
		display: block;
	}
</style>
