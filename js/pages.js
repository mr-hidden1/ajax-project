var Pages = {
    renderHome: async function(render) {
        render(
            renderCurrencyCard({
                isLoading: true
            })
        );

        const currencies = await getCoinList();

        render(
            renderCurrencyCard({
                currencies
            })
        );
    }
}